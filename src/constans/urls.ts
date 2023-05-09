const basePlaceholderUrl = 'https://jsonplaceholder.typicode.com'
const baseCarsUrl = 'http://owu.linkpc.net/carsAPI/v1'

const posts = '/posts'
const comments='/comments'
const albums='/albums'
const todos='/todos'
const users='/users'
const cars = '/cars'

const urlsPlaceholderApi = {
    posts,
    getByidPost: (id:number) => `${posts}/${id}`,
    comments,
    getByidComment: (id:number) => `${comments}/${id}`,
    getCommentsByIdPost(id:number){return `${posts}/${id}${comments}`},
    users,
    getByIDUser(id:number){return `${users}/${id}`},
    getPostsByIdUser(id:number){return `${users}/${id}${posts}`},
    albums,
    todos,
}


const urlsCarsApi={
    cars,
    byIdCar: (id:number) => `${cars}/${id}`
}





export {
    basePlaceholderUrl,
    baseCarsUrl,
    urlsCarsApi,
    urlsPlaceholderApi
}