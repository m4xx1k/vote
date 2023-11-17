export const photo = (name) => {
    if (name.startsWith('https://') || name.startsWith('http://')) {
        return name
    }
    return `https://api.repostuz.pp.ua/${name}`
    // return name
}
