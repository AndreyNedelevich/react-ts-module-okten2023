const baseURL = 'http://owu.linkpc.net/carsAPI/v2'

const cars = '/cars'
const auth = '/auth'
const urls = {
    cars: {
        cars,
        byId: (id: number): string => `${cars}/${id}`
    },
    //Создаем отдельный объект auth внутри один объект с полями для:
    auth: {
        register: '/users',
        //Запросс с  регистрацией
        login: auth,
        // Зпрос с отправкой данных для входа в акаунт пользователя.
        refresh: `${auth}/refresh`,
        // Метод refresh вернет строку на которую можно отправить запрос и в ответ получить обновленные токенны.
        me: `${auth}/me`
        //Метод me будет возвращать информацию о пользователе аккаунта его данные.
    }
}

export {
    baseURL,
    urls
}
