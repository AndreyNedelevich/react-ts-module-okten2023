const baseURL = 'https://jsonplaceholder.typicode.com'
//Базовая URL для передачи ее в метод create от библиотеки axios. Создаеться специальный объект к которому далее просто добавляем методы get, post и т.д.

const users = '/users'

const urls = {
    users: {
        users,
        byId: (id: string): string => `${users}/${id}`
    }
}

export {
    baseURL,
    urls
}
