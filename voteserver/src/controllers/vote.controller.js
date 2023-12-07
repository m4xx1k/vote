const ApiError = require('../errors/api.error');
const voteService = require('../services/vote.service')

class voteController {
    async check(req, res, next) {
        try {
            const {tg_id, candidate} = req.query;
            console.log({tg_id, candidate})
            if (!tg_id) {
                return next(ApiError.badRequest(''));
            }
            const vote = await voteService.check({tg_id, candidate});
            return res.status(200).json(vote);
        } catch (e) {
            next(e);
        }
    }


    async vote(req, res, next) {
        try {
            const {nomination, candidate, tg_id, type} = req.body
            const votes = await voteService.vote({nomination, candidate, tg_id, type});
            return res.json(votes);
        } catch (e) {
            next(e);
        }
    }

    async status(req, res, next) {
        try {
            const data = req.body
            console.log('sms', {data})
            return res.json({});
        } catch (e) {
            next(e);
        }
    }


}

module.exports = new voteController();
