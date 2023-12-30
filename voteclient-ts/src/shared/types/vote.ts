export interface IVote {
	_id: string
	candidate: string
	nomination: string
	user: string
	type: 'for' | 'against'
	rating: number
	createdAt: string
	updatedAt: string
}
