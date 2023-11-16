const Vote = require('../mongo/vote.model');
const Candidate = require('../mongo/candidate.model');
const User = require('../mongo/user.model');

class voteService {
    async check({tg_id, candidate}) {
        const user = await User.findOne({tg_id}, '_id').lean()
        const req = {user: user._id}

        if (candidate) req.candidate = candidate
        const result = await Vote.find(req, 'type').lean();
        console.log({result})
        return result


    }

    async vote({tg_id, nomination, candidate, type}) {
        const user = await User.findOne({tg_id}, '_id').lean()
        const req = {user: user._id, candidate, type}
        const vote = await Vote.findOne(req)
        const voteToDelete = await Vote.findOne({user: user._id, candidate, type: type === 'for' ? 'against' : 'for'})

        if (voteToDelete) {
            await Vote.findByIdAndDelete(voteToDelete._id)
            console.log({voteToDelete})
        }
        if (!vote) {
            if (!nomination) {
                const candidateForVote = await Candidate.findById(candidate, 'nomination').lean()
                req.nomination = candidateForVote.nomination
            }
            const result = await Vote.create(req);
            console.log({result, req})
            return result
        } else
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
