const ApiError = require('../errors/api.error');
const userService = require('../services/user.service')
class userController {
    async create(req, res, next) {
        try {
            const {ip, id:tg_id, username, phone} = req.body;

            if (!tg_id) {
                return next(ApiError.badRequest(''));
            }
            const user = await userService.create({ip, tg_id, username, phone});
            return res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }


    async isNewUser(req, res, next) {
        try {
            const {tg_id} = req.query
            const users = await userService.isNewUser({ tg_id});
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
    async findUsersInRange(req, res, next) {

        try {
            const data = req.query
            console.log(data)
            const users = await userService.findUsersInRange(data);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }


}

module.exports = new userController();
