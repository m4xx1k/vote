const Vote = require('../mongo/vote.model');
const Candidate = require('../mongo/candidate.model');
const mongoose = require('mongoose')

class voteService {
    async check({tg_id, nomination, candidate}) {
        const req = {tg_id}

        if (nomination) {
            req.nomination = nomination
            if (candidate) req.candidate = candidate
        }
        return await Vote.find(req);


    }

    async vote({tg_id, nomination, candidate}) {
        const req = {tg_id, nomination, candidate}
        const vote = await Vote.findOne(req)
        if (!vote)
            return Vote.create(req);
        else
            return vote
    }

    async calculateCandidateRatings(nominationId) {
        try {
            const cPipeline = [
                {
                    $match: {
                        nomination: nominationId,
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalValue: {$sum: '$value'},
                        totalCount: {$sum: 1},
                    },
                },
                {
                    $project: {
                        c: {$divide: ['$totalValue', '$totalCount']},
                    },
                },
            ];
            const [{c}] = await Vote.aggregate(cPipeline);

            const mPipeline = [
                {
                    $match: {
                        nomination: nominationId,
                    },
                },
                {
                    $group: {
                        _id: '$candidate',
                        voteCount: {$sum: 1},
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalVotes: {$sum: '$voteCount'},
                        candidateCount: {$sum: 1},
                    },
                },
                {
                    $project: {
                        m: {$divide: ['$totalVotes', '$candidateCount']},
                    },
                },
            ];
            const [{m}] = await Vote.aggregate(mPipeline);
            const ratingPipeline = [
                {
                    $match: {
                        nomination: nominationId,
                    },
                },
                {
                    $lookup: {
                        from: 'votes',
                        localField: '_id',
                        foreignField: 'candidate',
                        as: 'votes',
                    },
                },
                {
                    $addFields: {
                        p: {
                            $subtract: [
                                {$size: {$filter: {input: '$votes', as: 'vote', cond: {$eq: ['$$vote.type', 'for']}}}},
                                {
                                    $size: {
                                        $filter: {
                                            input: '$votes',
                                            as: 'vote',
                                            cond: {$eq: ['$$vote.type', 'against']}
                                        }
                                    }
                                },
                            ],
                        },
                    },
                },
                {
                    $addFields: {
                        rating: {
                            $add: [
                                {$divide: ['$p', {$size: '$votes'}]},
                                {
                                    $multiply: [
                                        {
                                            $divide: {$subtract: [{$size: '$votes'}, '$p']},
                                            $add: [m, {$multiply: [c, {$size: '$votes'}]}],
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
            ];

            const results = await Candidate.aggregate(ratingPipeline);

            console.log(results);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new voteService();
