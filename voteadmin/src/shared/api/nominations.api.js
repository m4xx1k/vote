import {api} from './axios'

export const fetchAllNominations = async () => {
    try {
        const response = await api.get('nomination')
        return response.data
    } catch (e) {
        console.log(e)
        return []
    }

}

export const updateNomination = async (data) => {
    try {

        const response = await api.put(`nomination/${data._id}`, data)
        return response.data
    } catch (e) {
        console.log(e)
        return []
    }

}
export const createNomination = async data => {
    try {
        const response = await api.post('nomination', data)
        return response.data
    } catch (e) {
        console.log(e)
        return []
    }

}
export const deleteNomination = async id => {
    try {
        const response = await api.delete(`nomination/${id}`)
        return response.data
    } catch (e) {
        console.log(e)
        return []
    }
}
export const updateNominationOrder = async (data) => {
    try {
        const response = await api.post('nomination/updateOrder', data)
        return response.data
    } catch (e) {
        console.log(e)
    }
}


