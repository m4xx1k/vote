const User = require('../mongo/user.model')
const Vote = require('../mongo/vote.model')

class userService {
    async create({ip, tg_id, username, phone}) {
        try {
            return await User.create({ip, tg_id, username, phone})

        } catch (e) {
            console.log('err on user create', e)
            return null
        }
    }

    async isNewUser({tg_id}) {
        const isUserInDatabase = await User.findOne({tg_id})
        return !isUserInDatabase
    }

    async findUsersInRange({startDate, endDate}) {
        const req = {}
        if (startDate) {
            req.createdAt = {}
            req.createdAt.$gte = new Date(startDate).setHours(0, 0, 0, 0)
        }
        if (endDate) {
            if (!req.createdAt) req.createdAt = {}
            req.createdAt.$lte = new Date(endDate).setHours(23, 59, 59, 999)
        }
        console.log({req})
        const users = await User.find(req);
        return users;
    }

    async delete(filter) {
        const user = await User.findOneAndDelete(filter).lean()
        const deletedVotes = await Vote.deleteMany({user: user._id}).lean()
        return {user, votesCount: deletedVotes.length, deletedVotes}
    }

}


module.exports = new userService();
