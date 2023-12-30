import { INomination } from '../types/nomination'
import { api, serverFetch } from './fetchers'

export const fetchAllNominations = async (): Promise<INomination[]> => {
	try {
		const response = await api.get('nomination/')
		return response.data
	} catch (e) {
		console.log(e)
		return []
	}
}

export const serverFetchAllNominations = async (): Promise<INomination[]> => {
	'use server'
	try {
		const response = await serverFetch({ url: 'nomination/' })
		return response.json()
	} catch (e) {
		console.log(e)
		return []
	}
}
