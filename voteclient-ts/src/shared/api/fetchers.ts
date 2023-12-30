import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://api.repostuz.pp.ua',
})
type TServerFetch = {
	url: string
	config?: RequestInit
}
export const serverFetch = async ({ url, config }: TServerFetch) => {
	return await fetch(`https://api.repostuz.pp.ua/${url}`, {
		cache: 'no-store',
		...config,
	})
}
