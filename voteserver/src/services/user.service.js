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
            req.date = {}
            req.date.$gte = new Date(startDate).setHours(0, 0, 0, 0)
        }
        if (endDate) {
            if (!req.date) req.date = {}
            req.date.$lte = new Date(endDate).setHours(23, 59, 59, 999)
        }
        console.log({req})
        const users = await User.find(req);

        return users;
    }

}

module.exports = new userService();
