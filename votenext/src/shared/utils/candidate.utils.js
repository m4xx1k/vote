export const photo = (name) => {
    if (name.startsWith('https://') || name.startsWith('http://')) {
        return name
    }
    return `http://localhost:5001/${name}`
    // return name
}
