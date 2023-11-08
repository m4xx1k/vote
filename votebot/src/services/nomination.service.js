const {api} = require("./index");

module.exports = {
    findAll: async () => {
        const all = await api.get('/nomination/')
        return all.data
    },
    findOne: async ({id}) => {
        const all = await api.get(`/nomination/${id}`)
        return all.data
    }
}
