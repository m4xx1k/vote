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
export const getCandidateWithRating = async (id) => {
    try {
        const response = await api.get(`candidate/rating/${id}`)
        return response.data
    } catch (e) {
        console.log(e)
        return e
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

export const findUserVote = async (params) => {
    try {
        const response = await api.get(`vote/`, {params})
        return response.data
    } catch (e) {
        console.log(e)
        return e.message
    }
}
export const voteForCandidate = async (body) => {
    try {
        const response = await api.post(`vote/`, body)
        return response.data
    } catch (e) {
        console.log(e)
        return e.message
    }
}

const info = {
    "candidate": {
        "message": "Network Error",
        "name": "AxiosError",
        "stack": "AxiosError: Network Error\n at l.onerror (https://2v9vxd30-3000.euw.devtunnels.ms/_next/static/chunks/144-55ec10c20e7c9fc7.js:22:22204)",
        "config": {
            "transitional": {"silentJSONParsing": true, "forcedJSONParsing": true, "clarifyTimeoutError": false},
            "adapter": ["xhr", "http"],
            "transformRequest": [null],
            "transformResponse": [null],
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "maxBodyLength": -1,
            "env": {},
            "headers": {"Accept": "application/json, text/plain, */*"},
            "baseURL": "http://localhost:5001/",
            "method": "get",
            "url": "candidate/rating/651e0ae758d66de5979aab66"
        },
        "code": "ERR_NETWORK",
        "status": null
    }
}
