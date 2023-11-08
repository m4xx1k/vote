import {api} from './axios'

export const fetchAllCandidates = async () => {
    try {
        const response = await api.get('candidate')
        return response.data
    } catch (e) {
        console.log(e)
        return []
    }

}
export const fetchCandidatesNames = async id => {
    try {
        const response = await api.get(`/candidate/nomination/${id}/names`)
        console.log(response.data)
        return response.data
    } catch (e) {
        console.log(e.message)
        return []
    }

}
export const fetchOneCandidate = async id => {
    try {
        const response = await api.get(`/candidate/${id}`)
        console.log(response.data)
        return response.data
    } catch (e) {
        console.log(e.message)
        return []
    }

}
export const updateCandidate = async (id, data) => {
    try {

        const response = await api.put(`candidate/${id}`, data)
        return response.data
    } catch (e) {
        console.log(e)
        return []
    }

}
export const createCandidate = async data => {
    try {
        const response = await api.post('candidate', data)
        return response.data
    } catch (e) {
        console.log(e)
        return []
    }

}
export const deleteCandidate = async id => {
    try {
        const response = await api.delete(`candidate/${id}`)
        return response.data
    } catch (e) {
        console.log(e)
        return []
    }
}
export const updateCandidateOrder = async (data) => {
    try {
        const response = await api.post('candidate/updateOrder', data)
        return response.data
    } catch (e) {
        console.log(e)
    }
}


