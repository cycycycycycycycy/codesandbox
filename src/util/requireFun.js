
const requireFun = (url) => {
    return new URL(`../assets/${url}`, import.meta.url).href
}
export default requireFun


