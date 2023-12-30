import { ICandidate, ICandidateWidthRating } from '../types/candidate'
import { api, serverFetch } from './fetchers'

export const findOneCandidate = async (id: string) => {
	try {
		const response = await api.get(`candidate/${id}`)
		return response.data
	} catch (e) {
		console.log(e)
		return e
	}
}
export const getCandidateWithRating = async (
	id: string
): Promise<ICandidateWidthRating | undefined> => {
	try {
		const response = await api.get(`candidate/rating/${id}`)
		return response.data
	} catch (e) {
		console.log(e)
	}
}
export const serverFetchCandidateWithRating = async (
	id: string
): Promise<ICandidateWidthRating | undefined> => {
	try {
		const response = await serverFetch({
			url: `candidate/rating/${id}`,
			config: {
				next: {
					tags: ['candidate'],
				},
			},
		})
		return response.json()
	} catch (e) {
		console.log(e)
	}
}
export const fetchCandidatesByNomination = async (id: string) => {
	try {
		const response = await api.get(`candidate/candidatesByNomination/${id}`)
		return response.data
	} catch (e) {
		console.log(e)
		return e
	}
}

export const serverFetchCandidatesByNomination = async (
	id: string
): Promise<ICandidate[]> => {
	try {
		const response = await serverFetch({
			url: `candidate/candidatesByNomination/${id}`,
		})
		return response.json()
	} catch (e) {
		console.log(e)
		return []
	}
}

export const findUserVote = async (params: Record<string, unknown>) => {
	try {
		const response = await api.get(`vote/`, { params })
		return response.data
	} catch (e) {
		console.log(e)
		return e
	}
}
export const voteForCandidate = async (body: Record<string, unknown>) => {
	try {
		const response = await api.post(`vote/`, body)
		return response.data
	} catch (e) {
		console.log(e)
		return e
	}
}
