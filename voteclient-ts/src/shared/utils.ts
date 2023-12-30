export const photo = (name: string): string => {
	if (name.startsWith('https://') || name.startsWith('http://')) {
		return name
	}
	return `https://api.repostuz.pp.ua/${name}`
	// return `https://api.repostuz.pp.ua/${name}`
	// return name
}
