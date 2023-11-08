const ApiError = require('../errors/api.error');
const candidateService = require('../services/candidate.service');

class candidateController {
    async create(req, res, next) {
        try {
            const {body} = req.body;
            const {order, ru, uz, nomination} = JSON.parse(body)
            const photo = req.file;

            if (!photo || !ru.name || !uz.name || !nomination) {
                return next(ApiError.badRequest(''));
            }
            const candidate = await candidateService.create({photo: photo.filename, ru, uz, order, nomination});
            return res.status(200).json(candidate);
        } catch (e) {
            next(e);
        }
    }


    async findAll(req, res, next) {
        try {
            const candidates = await candidateService.findAll();
            return res.json(candidates);
        } catch (e) {
            next(e);
        }
    }

    async candidateByNomination(req, res, next) {
        try {
            const {id} = req.params
            const candidates = await candidateService.candidateByNomination({id});
            return res.json(candidates);
        } catch (e) {
            next(e);
        }
    }

    async candidateNamesByNomination(req, res, next) {
        try {
            const {id} = req.params
            console.log({id})
            const candidates = await candidateService.candidateNamesByNomination({nomination: id});
            return res.json(candidates);
        } catch (e) {
            next(e);
        }
    }

    async findById(req, res, next) {
        try {
            const candidate = await candidateService.findById(req.params.id);
            if (!candidate) {
                return next(ApiError.notFound('candidate not found.'));
            }
            return res.json(candidate);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {body} = req.body;
            const photo = req.file;
            const data = JSON.parse(body)
            if (!data && !photo) {
                return next(ApiError.badRequest())
            }
            const candidate = await candidateService.update(req.params.id, data, photo?.filename);
            if (!candidate) {
                return next(ApiError.notFound('candidate not found.'));
            }
            return res.json(candidate);
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
            const result = await candidateService.delete(req.params.id);
            if (!result) {
                return next(ApiError.notFound('candidate not found.'));
            }
            return res.json({message: 'candidate deleted.'});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new candidateController();
