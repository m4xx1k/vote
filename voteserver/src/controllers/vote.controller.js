const ApiError = require('../errors/api.error');
const voteService = require('../services/vote.service')
class voteController {
    async check(req, res, next) {
        try {
            const {tg_id, nomination, candidate} = req.query;

            if (!tg_id) {
                return next(ApiError.badRequest(''));
            }
            const vote = await voteService.check({tg_id, nomination, candidate});
            return res.status(200).json(vote);
        } catch (e) {
            next(e);
        }
    }


    async vote(req, res, next) {
        try {
            const {nomination, candidate, tg_id} = req.body
            const votes = await voteService.vote({nomination, candidate, tg_id});
            return res.json(votes);
        } catch (e) {
            next(e);
        }
    }


}

module.exports = new voteController();
