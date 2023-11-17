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

    async calculateAverageRating(nomination) {
        const votes = await Vote.find({nomination}).lean();
        let sum = 0
        votes.forEach(vote => {
            if (vote.type === 'for') sum += 1
            else sum -= 1
        })
        return sum / votes.length

    }

    async calculateAverageNumberOfVotesForCandidate(nomination) {
        const candidates = await Candidate.countDocuments({nomination})
        const votes = await Vote.find({nomination}).lean()
        const votesCounts = {}
        votes.forEach(({candidate, type}) => {
            if (!votesCounts[candidate]) {
                votesCounts[candidate] = {for: 0, against: 0}
            }
            votesCounts[candidate][type] += 1
        })
        let sumOfRatings = 0
        for (const candidate in votesCounts) {
            const votes = votesCounts[candidate]
            sumOfRatings += votes.for - votes.against

        }

        return sumOfRatings / candidates
    };

    async candidateNamesByNomination({nomination}) {
        return await Candidate.find({nomination}, 'ru uz').lean()
    }

    async candidateByNomination({id}) {
        const candidates = await Candidate.find({nomination: id}).lean();
        const votesNumber = await Vote.countDocuments({nomination: id})

        const C = await this.calculateAverageRating(id)
        const M = await this.calculateAverageNumberOfVotesForCandidate(id)
        if (votesNumber) {
            const votedCandidates = []
            for (const candidate of candidates) {
                const votesFor = await Vote.countDocuments({type: 'for', candidate: candidate._id})
                const votesAgainst = await Vote.countDocuments({type: 'against', candidate: candidate._id})
                const V = votesFor
                const P = votesFor - votesAgainst

                const rating = (V * P) / (V + M) + (M * C) / (V + M)

                votedCandidates.push({
                    ...candidate,
                    rating,
                    for: votesFor,
                    against: votesAgainst,
                })
            }
            return votedCandidates
        } else return candidates

    }

    async getCandidateWithRating(candidateId) {
        const candidate = await Candidate.findById(candidateId).lean();
        if (!candidate) {
            return null;
        }

        const votesFor = await Vote.countDocuments({type: 'for', candidate: candidate._id});
        const votesAgainst = await Vote.countDocuments({type: 'against', candidate: candidate._id});

        const C = await this.calculateAverageRating(candidate.nomination);
        const M = await this.calculateAverageNumberOfVotesForCandidate(candidate.nomination);
        const V = votesFor;
        const P = votesFor - votesAgainst;

        const rating = (V * P) / (V + M) + (M * C) / (V + M);
        const neutralVotesInNomination = await VoteNeutral.countDocuments({nomination: candidate.nomination})
        const neutralVotesForCandidate = await VoteNeutral.countDocuments({candidate: candidateId})
        let neutral = 0
        if (neutralVotesInNomination !== 0 && !Number.isNaN(neutralVotesForCandidate)) {
            neutral = (neutralVotesForCandidate / neutralVotesInNomination) * 100
        }
        return {
            ...candidate,
            rating,
            for: votesFor,
            against: votesAgainst,
            neutral
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
