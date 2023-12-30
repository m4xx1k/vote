export interface ICandidate {
	_id: string
	uz: {
		name: string
		description: string
	}
	ru: {
		name: string
		description: string
	}
	photo: string
	order: number
	nomination: string
}
export interface ICandidateWidthRating extends ICandidate {
	rating: number
	for: {
		count: number
		percent: number
	}
	against: {
		count: number
		percent: number
	}
}
