import axios, {AxiosError} from 'axios';
import {createBrowserHistory} from "history";
// Импортируем из библиотеки "history" функцию для работы с логикой маршрутизации так как мы не можем использовать хуки
//useNavigate в обычных файлах (можем использовать только внутри компонентов)

import {baseURL, urls} from '../constants';
import {authService} from './auth.service';
import {IWaitListCB} from "../types";


const axiosService = axios.create({baseURL});

let isRefreshing = false
// Создаем переменную let которую будем динаически менять внутри кода ibterseptora на response. Если мы будем начинать
//стадию refresh токенна то ее значение меняем на true.

const weitList: IWaitListCB[] = [];
//В переменной weitList мы будем сохранять массив с CollBeck (функция)   него будут соханены функции внутри которых
//будут Promise в состоянии resolve. Это будут промисы тех запросов которые были отправленны в то период пока выполнялся Refreshing  обновление токенов.
//Типизируем массив это будет массив из CAllBeck.

const history = createBrowserHistory({window})
//Для использования используем вызов функции и как аргумент передаем в виде объекта {window}
//В  history находиться вся история как был загружен React приложения.


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
        return res
    },
    //Второй параметр: Если в ответ с севрера прилетает ошибка  то здесь формируем логику.
    async (error: AxiosError) => {

        const originalRequest = error.config;
        //Далее с error вытягиваем поле config и присваиваем его переменной  originalRequest
        // В данной переменной мы получим всю конфигурацию с ошибкой.

        if (error.response.status === 401) {
            //Проверяем на status ошибки 401
            if (!isRefreshing) {
                //Проверяем находимся ли мы в состоянии refresh токенна.
                //Если условие срабатывает значит мы не в состояния рефрешинга. Меняем значение переменной isRefreshing
                //на true (обозначая старт процесса)
                isRefreshing = true;

                // и соответственно в блоке try catch запускаем специальный сервис  authService.refresh() для обновление токеннов. (по токенну reffresh)
                try {
                    await authService.refresh()
                    //Отправляем запрос на обновление токеннов при помощи refresh токенна.
                    isRefreshing = false;
                    //Если запрос на refresh отправлен значит мы выходим из состояния Refreshing (меняем на false)
                    afterRefresh()
                    //после успешного Refreshinga делае делаем вызов функции afterRefresh() котторая позапускает все функции, которые были сохраненны
                    // в массив (данные запроссы поступили в период обновления токенна мы их сохранили и теперь парезапускаем)

                    return axiosService.request(originalRequest)
                    //Если запрос refresh()  был успешный  мы сделали  перезапись токенов то соответсвенно мы отправляем
                    // наш обновленный response но в него уже попадут обновленные токенны для авторизации на API.
                } catch (e) {
                    authService.deleteTokens();
                    isRefreshing = false;
                    //Если в предидущем блоке try мы получим ошибку то соотвтественно мы не выйдем из состояния Refreshing
                    //поэтому выходим обезательно делаем это еще в блоке catch
                    history.replace("/login?expSession=true")
                    //При ошибки refreshinga значит что пользователь стал не авторизованным соответсвенно мы его перебрасываем
                    // на строницу с логином.


                    return Promise.reject(error)
                    //Если при отправки запроса refresh происходит ошибка то соотвтетсвенно  у второго токена refresh закончился переод
                    //то тогода мы удаляем его из хранилища LocalStorage  и возвращаем  Promise.reject с ошибкой.

                }
            }

            if (originalRequest.url === urls.auth.refresh) {
                //Если ошибка упадет на запрос на Refresh определяем это при помощи сравнении URL которую упала ошибка и
                //url которая указана в списке рабочик url. Если даст true то значит что  срок  refresh токенна вышел.
                //выбрасывания ошибки при помощи Promise.reject(error)
                return Promise.reject(error)
            }
            //Если ошибка упала не на Refres мы  будем возвращать новый промис в  нем будет resolve.
            //внутри resolve вызываем функцию  subscriveToWaitList которая пушит в массив AllBeck функцию которую
            //мы передаем как аргумент. (Мы не вызываем функцию мы передаем CallBeck как аргумент а внутри него будет
            // лежать вызов уже  resolve  где мы отодаем сам промис то что пообещали.)
            return new Promise(resolve => {
                    subscriveToWaitList(() => {
                        resolve(axiosService(originalRequest))
                    })
                }
            )
        }
        return Promise.reject(error)
        //Если ответах но азпроссах будут другие статусы ощибок, то код ынутри блоков if не будет выполнент мы просто
        //мы веренем на них просто Promise.reject c ошибкой. Reject (сбрасывает запросс)
    }
)
// Есть ньюнс в том что при работе с кодом может выпоняться паралельно несколько один за другим запроссов
//И так как первый запрос который заходит и на него начал выполнеие код refresh (изменения переменной isRefreshing= true )
// ТО сответственно остальные запросы уже не попадут в блок с if (!isRefreshing) поэтому нам необходимо их
//все запросы необходимо сохранять.


// Создаем функцию для записи в массив CallBeck c теми промисами которые поступили во время Рефрешинга.
const subscriveToWaitList = (cb: IWaitListCB): void => {
    weitList.push(cb)
    //Как аргумент функция будет принимать функцию и все что будет выпооняться внк=утри этой функции эта функция будет пушиться \
    //в массив weitList (НЕ ВЫЗЫВАТЬСЯ)
}

//Функция для запуска тех запросов на которые упала ошибка во время Refreshinga Токенна.
const afterRefresh = () => {
    //спользуем цикл  while который будет выполняться пока длина массива в условии дает true
    while (weitList.length) {
        const callBeck = weitList.pop();
        //На каждой итерации метод pop() будет удалять из массива функцию но при этом будет ее возвращать в переменную callBeck
        //И после этого просто запускаем CAllBeck
        callBeck();
    }
}

export {
    axiosService,
    history
}
