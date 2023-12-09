const ApiError = require('../errors/api.error');
const nominationService = require('../services/nomination.service');

class nominationController {
    async create(req, res, next) {
        try {
            const {ru, uz} = req.body;

            if (!ru.name || !uz.name) {
                return next(ApiError.badRequest(''));
            }
            const nomination = await nominationService.create({ru, uz});
            return res.status(200).json(nomination);
        } catch (e) {
            next(e);
        }
    }


    async findAll(req, res, next) {
        try {
            const nominations = await nominationService.findAll();
            console.log(nominations)
            return res.json(nominations);
        } catch (e) {
            next(e);
        }
    }

    async findAllWithCandidates(req, res, next) {
        try {
            const nominations = await nominationService.findAllWithCandidates();
            console.log(nominations)
            return res.json(nominations);
        } catch (e) {
            next(e);
        }
    }

    async findById(req, res, next) {
        try {
            const nomination = await nominationService.findById(req.params.id);
            if (!nomination) {
                return next(ApiError.notFound('nomination not found.'));
            }
            return res.json(nomination);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {

            const {ru, uz} = req.body;
            const {id} = req.params
            if (!ru || !uz) {
                return next(ApiError.badRequest(''))
            }
            const nomination = await nominationService.update(id, {ru, uz});
            if (!nomination) {
                return next(ApiError.notFound('nomination not found.'));
            }
            return res.json(nomination);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!id) {
                return next(ApiError.badRequest('Not id'))
            }
            const result = await nominationService.delete(req.params.id);
            if (!result) {
                return next(ApiError.notFound('nomination not found.'));
            }
            return res.json({message: 'nomination deleted.'});
        } catch (e) {
            next(e);
        }
    }

    async updateOrder(req, res, next) {
        try {
            const {id, sourceOrder, destinationOrder} = req.body
            if (!id || Number.isNaN(sourceOrder) || Number.isNaN(destinationOrder)) {
                return next(ApiError.badRequest('Not !id || !sourceOrder || !destinationOrder'))
            }
            const result = await nominationService.updateOrder({id, sourceOrder, destinationOrder});
            if (!result) {
                return next(ApiError.notFound('nomination not found.'));
            }
            return res.json({message: 'nomination changed'});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new nominationController();
