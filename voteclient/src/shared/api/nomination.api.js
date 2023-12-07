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

export const serverFetchAllNominations = async () => {
    try {
        const response = await fetch('https://api.repostuz.pp.ua/nomination/', {
            cache: 'no-store'
        })
        return response.json()
    } catch (e) {
        console.log(e)
        return e.message
    }
}
