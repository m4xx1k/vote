const Vote = require('../mongo/vote.model');
const Candidate = require('../mongo/candidate.model');
const User = require('../mongo/user.model');

class voteService {
    async check({tg_id, candidate}) {
        let result
        const user = await User.findOne({tg_id}, '_id').lean()
        const req = {user: user._id}

        if (candidate) req.candidate = candidate
        result = await Vote.find(req, 'type').lean();
        if (result?.length) {
            return result
        }
        return result


    }

    async vote({tg_id, nomination, candidate, type}) {

        const user = await User.findOne({tg_id}, '_id').lean()
        const req = {user: user._id, candidate, type}
        if (!nomination) {
            const candidateForVote = await Candidate.findById(candidate, 'nomination').lean()
            req.nomination = candidateForVote.nomination
        }
        const vote = await Vote.findOne(req)

        await Vote.findOneAndDelete({
            user: user._id,
            candidate,
            type: type === 'for' ? 'against' : 'for'
        })

        if (!vote) {
            return await Vote.create(req)
        } else {
            return vote
        }
    }

}

module.exports = new voteService();
