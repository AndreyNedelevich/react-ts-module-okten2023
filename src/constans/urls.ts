const baseURL = 'https://jsonplaceholder.typicode.com'

const users = '/users'
const posts='/posts'

const urls = {
    users: {
        users,
        byUserId: (id: string): string => `${users}/${id}`,
        todos:'/todos',
        albums:'/albums',
        comments:'/comments',
        posts,
        byPostId: (id: string): string => `${posts}/${id}`,
    }
}

export {
    baseURL,
    urls
}