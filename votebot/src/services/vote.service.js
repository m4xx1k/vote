const {api} = require("./index");

module.exports = {

    check: async ({tg_id, nomination, candidate}) => {
        try {
            const all = await api.get('/vote/', {params: {tg_id, nomination, candidate}})
            return all.data
        } catch (e) {
            console.log('err on vote check req=', {tg_id, nomination, candidate}, e)
            return []
        }

    },

    vote: async ({tg_id, nomination, candidate}) => {
        try{
            const all = await api.post('/vote/', {tg_id, nomination, candidate})
            return all.data
        }catch (e) {
            console.log(e)
        }

    }

}
