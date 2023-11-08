const {api} = require("./index");
module.exports = {
    findAllByNominationId: async ({id}) => {
        try {
            if (id) {
                const all = await api.get(`/candidate/candidatesByNomination/${id}`)
                return all.data
            } else {
                return []
            }

        } catch (e) {
            console.log({findAllByNominationId: id}, e)
            return []
        }

    },
    findOne: async ({id}) => {
        try {
            if (id) {
                const candidate = await api.get(`/candidate/${id}`)
                return candidate.data
            } else {
                return []
            }
        } catch (e) {
            console.log('err on findeOne candidate, id=', id, e)
            return []
        }

    }
}
