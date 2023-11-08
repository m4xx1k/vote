const {api} = require("./index");
const userService = {
    create: async ({ip, id, username, phone}) => {
        try{
            const {data} =  await api.post('/user/',{ip, id, username, phone})
            return data

        }catch (e) {
            console.log('err on user create', e)
            return null
        }
    },
    isNewUser: async ({id}) => {
        const {data} = await api.get('/user/isNewUser', {params:{tg_id: id}})

        return data
    }
}

module.exports = userService
