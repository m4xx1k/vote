const Nomination = require('../mongo/nomination.model');
const Vote = require('../mongo/vote.model');
const candidateService = require('./candidate.service')

class nominationService {
    async create({ru, uz}) {
        const nominationLength = await Nomination.countDocuments()
        return await Nomination.create({ru, uz, order: nominationLength + 1})
    }

    async findAll() {
        const nominations = await Nomination.find({}).sort({order: 1}).lean();
        for (let i = 0; i < nominations.length; i++) {
            nominations[i].votes = await Vote.countDocuments({nomination: nominations[i]._id})
        }
        return nominations
    }

    async findAllWithCandidates() {
        const nominations = await this.findAll();
        const candidatesPromises = nominations.map(({_id}) => candidateService.candidateByNomination({id: _id}))
        const candidates = await Promise.all(candidatesPromises)

        return nominations.map((nomination, i) => ({...nomination, candidates: candidates[i]}))
    }

    async findById(id) {
        return await Nomination.findById(id);
    }

    async update(id, data) {
        return await Nomination.findByIdAndUpdate(id, data);
    }

    async delete(id) {

        return await Nomination.findByIdAndDelete(id);
    }


    async updateOrder({id, sourceOrder, destinationOrder}) {
        const session = await Nomination.startSession();

        try {
            await session.withTransaction(async () => {
                const nominationToUpdate = await Nomination.findByIdAndUpdate(id, {order: destinationOrder + 999_999}); // fakeUpdatedNomination to avoid duplicates

                const nominationsToUpdate = await Nomination.find({
                    order: {
                        $lte: destinationOrder > sourceOrder ? destinationOrder : sourceOrder,
                        $gte: destinationOrder > sourceOrder ? sourceOrder : destinationOrder,
                    },
                });

                for (const nomination of nominationsToUpdate) {
                    if (nomination._id === id) {
                        // Skip updating the current nomination, as it has already been updated.
                        continue;
                    }

                    await Nomination.findByIdAndUpdate(nomination._id, {
                        order: destinationOrder > sourceOrder ? nomination.order - 1 : nomination.order + 1,
                    });
                }
            });
        } finally {
            await session.endSession();
        }

        const updatedNomination = await Nomination.findByIdAndUpdate(id, {order: destinationOrder});

        return {is: !!updatedNomination, updatedNomination};
    }


}


module.exports = new nominationService();
