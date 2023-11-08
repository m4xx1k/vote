import {api} from './axios'

export const findOneCandidate = async (id) => {
    try {
        const response = await api.get(`candidate/${id}`)
        return response.data
    } catch (e) {
        console.log(e)
        return e.message
    }
}
export const fetchCandidatesByNomination = async (id) => {
    try {
        const response = await api.get(`candidate/candidatesByNomination/${id}`)
        return response.data
    } catch (e) {
        console.log(e)
        return e.message
    }
}
