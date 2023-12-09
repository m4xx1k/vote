const Candidate = require('../mongo/candidate.model');
const Vote = require('../mongo/vote.model');
const VoteNeutral = require('../mongo/vote-neutral.model');
const path = require("path");
const fs = require("fs");

class candidateService {
    async create({name, photo, nomination, ru, uz, order}) {
        const candidate = await Candidate.create({name, photo, nomination, ru, uz, order: order || 0});
        return candidate
    }

    async findAll() {
        return await Candidate.find().lean();
    }


    async candidateByNomination({id}) {
        const candidates = await Candidate.find({nomination: id}).lean();
        const votesNumber = await Vote.countDocuments({nomination: id})

        if (votesNumber) {
            const votedCandidates = []
            for (const candidate of candidates) {
                const votesForCount = await Vote.countDocuments({type: 'for', candidate: candidate._id})
                const votesAgainstCount = await Vote.countDocuments({type: 'against', candidate: candidate._id})

                const rating = votesForCount - votesAgainstCount
                let votesForPercent = 0
                let votesAgainstPercent = 0
                if (votesForCount || votesAgainstCount) {
                    votesForPercent = Math.round((votesForCount / (votesForCount + votesAgainstCount)) * 100)
                    votesAgainstPercent = 100 - votesForPercent
                }
                const neutralVotesInNomination = await VoteNeutral.countDocuments({nomination: candidate.nomination})
                const neutralVotesForCandidate = await VoteNeutral.countDocuments({candidate: candidate._id})
                let neutral = 0
                if (neutralVotesInNomination !== 0 && !Number.isNaN(neutralVotesForCandidate)) {
                    neutral = (neutralVotesForCandidate / neutralVotesInNomination) * 100
                }
                votedCandidates.push({
                    ...candidate,
                    rating,
                    neutral: {
                        percent: neutral,
                        count: neutralVotesForCandidate
                    },
                    for: {
                        count: votesForCount,
                        percent: votesForPercent
                    },
                    against: {count: votesAgainstCount, percent: votesAgainstPercent},
                })
            }
            const sortedCandidates = votedCandidates.sort((a, b) => b.rating - a.rating)
            return sortedCandidates
        } else return candidates

    }

    async candidateNamesByNomination({nomination}) {
        const candidates = await Candidate.find({nomination}, '_id ru uz').lean()
        const result = []
        for (const candidate of candidates) {
            const votesForCount = await Vote.countDocuments({type: 'for', candidate: candidate._id})
            const votesAgainstCount = await Vote.countDocuments({type: 'against', candidate: candidate._id})

            const rating = votesForCount - votesAgainstCount
            const votesForPercent = Math.round((votesForCount / (votesForCount + votesAgainstCount)) * 100)
            const votesAgainstPercent = 100 - votesForPercent
            console.log({
                for: {
                    count: votesForCount,
                    percent: votesForPercent
                },
                against: {
                    count: votesAgainstCount, percent: votesAgainstPercent
                },
            })
            result.push({
                ...candidate,
                rating,
                for: {
                    count: votesForCount,
                    percent: votesForPercent
                },
                against: {
                    count: votesAgainstCount, percent: votesAgainstPercent
                },
            });
        }

        return result.toSorted((a, b) => b.rating - a.rating)
    }

    async getCandidateWithRating(candidateId) {
        const candidate = await Candidate.findById(candidateId).lean();
        if (!candidate) {
            return null;
        }

        const votesForCount = await Vote.countDocuments({type: 'for', candidate: candidate._id})
        const votesAgainstCount = await Vote.countDocuments({type: 'against', candidate: candidate._id})

        const rating = votesForCount - votesAgainstCount
        let votesForPercent = 0
        let votesAgainstPercent = 0
        if (votesForCount || votesAgainstCount) {
            votesForPercent = Math.round((votesForCount / (votesForCount + votesAgainstCount)) * 100)
            votesAgainstPercent = 100 - votesForPercent
        }
        const neutralVotesInNomination = await VoteNeutral.countDocuments({nomination: candidate.nomination})
        const neutralVotesForCandidate = await VoteNeutral.countDocuments({candidate: candidateId})
        let neutral = 0
        if (neutralVotesInNomination !== 0 && !Number.isNaN(neutralVotesForCandidate)) {
            neutral = (neutralVotesForCandidate / neutralVotesInNomination) * 100
        }
        console.log({
            for: {
                count: votesForCount,
                percent: votesForPercent
            },
            against: {
                count: votesAgainstCount, percent: votesAgainstPercent
            },
        })
        return {
            ...candidate,
            rating,
            neutral,
            for: {
                count: votesForCount,
                percent: votesForPercent
            },
            against: {
                count: votesAgainstCount, percent: votesAgainstPercent
            },
        };
    }

    async findById(id) {
        const candidate = await Candidate.findById(id).lean();

        const votesFor = await Vote.countDocuments({type: 'for', candidate: candidate._id})
        const votesAgainst = await Vote.countDocuments({type: 'against', candidate: candidate._id})
        console.log({votesFor, votesAgainst})
        return {...candidate, for: votesFor, against: votesAgainst}
    }

    async update(id, data, photo) {
        const candidate = await Candidate.findById(id);
        if (!candidate) return null;

        if (!!data && !!photo) {
            const oldImagePath = path.join(__dirname, '..', candidate.photo);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Error deleting file:", err);
            });
            return await Candidate.findByIdAndUpdate(id, {...data, photo}, {new: true});
        } else if (!!data) {
            return await Candidate.findByIdAndUpdate(id, data, {new: true});
        } else if (!!photo) {
            const oldImagePath = path.join(__dirname, '..', candidate.photo);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Error deleting file:", err);
            });
            return await candidate.findByIdAndUpdate(id, {photo}, {new: true});
        }
    }

    async delete(id) {
        const candidate = await Candidate.findById(id);
        if (!candidate) return null;
        const imagePath = path.join(__dirname, '..', candidate.photo);
        fs.unlink(imagePath, (err) => {
            if (err) console.error("Error deleting file:", err);
        });
        return await Candidate.findByIdAndDelete(id);
    }
}

module.exports = new candidateService();
