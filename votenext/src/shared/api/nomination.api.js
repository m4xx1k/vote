import {api} from './axios'

export const fetchAllNominations = async () => {
    try {
        const response = await api.get('nomination/')
        return response.data
    } catch (e) {
        console.log(e)
        return e.message
    }
}
