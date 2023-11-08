const User = require('../mongo/user.model')

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
            req.createdAt.$gte = startDate
        }
        if (endDate) {
            if (!req.createdAt) req.createdAt = {}
            req.createdAt.$lte = endDate
        }
        const users = await User.find(req);

        return users;
    }

}

module.exports = new userService();
