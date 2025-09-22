
const requireFun = (url, com = false) => {
    if (com) {

        return new URL(`../views/Com/${url}`, import.meta.url).href

    } else {
        return new URL(`../assets/img/${url}.png`, import.meta.url).href
    }
}

export default requireFun


