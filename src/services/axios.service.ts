import axios from 'axios';

import {baseURL} from '../constants';
import {authService} from './auth.service';



const axiosService = axios.create({baseURL});




///////////////////////////////////////////////////////////////
//Интерсепторы

//Обращаемся в  axiosService у него есть interceptors, далее определяем в какую сторону будем перехватывать (на запрос или на ответ запросса)

//1) Перехватываем на request на запросс на сервер.
axiosService.interceptors.request.use(config => {
    const access = authService.getAccessToken();
    //Вытягиваем из localStorage токен accesKey.

    if (access) {
        //Если у нас есть этот токен access, то мы обращаемся в поле  headers о него в поле Authorization и ложим в поле
        //Authorization наш токен акцессор. На api он проверяеться если он совпадает то мы в ответ с сервера получаем
        // ответ на запросс. Такак процедура будет происходить при каждом обращении к ApI  те поля где требуеться аворизация.
        config.headers.Authorization = `Bearer ${access}`
    }

    return config
    //Если даже токена в lokaleStorage не было мы все равно отдаем config и запрос летит далее без него.
})


//2) Перехватываем на response на ответ с сервера.

//Первый параметр в use если был ответ с сервера и он не имел ошибки и был успешен то просто возвращаем этот ответ и он
// доставляеться нам без изменений.
axiosService.interceptors.response.use(
    res => {
        console.log(res);
        return res
    },
    //Второй параметр: Если в ответ с севрера прилетает ошибка  то здесь формируем логику.
    async error => {
        const originalRequest = error.config;
        console.log(originalRequest);
        // В данной переменной мы получим всю конфигурацию с ошибкой.
        if (error.response.status === 401&&error.config&&!error.config._isRefreshing) {
            originalRequest._isRefreshing = true
            //Если условие срабатывает значит мы начали состояния рефрешинга и соответственно меняем его на true. Обозначая что мы делаем
            // рефреш токенна.
            try {
                await authService.refresh()
                return axiosService.request(originalRequest)
                //Если мы сделали делали перезапись токенов то соответсвенно мы отправляем наш обновленный запросс далее
                //с небольшой коректировкой (добавли поле originalRequest._isRefreshing = true) что бы не зацыклить запросы.

            } catch (e) {
                authService.deleteTokens()
                return Promise.reject(error)
                //Если при отправки запроса refresh происходит ошибка то соотвтетсвенно  у второго токена refresh закончился переод
                //то тогода мы удаляем его из хранилища LocalStorage  и возвращаем  Promise.reject с ошибкой.
            }
        }
            return Promise.reject(error)
    }
)

export {
    axiosService
}
