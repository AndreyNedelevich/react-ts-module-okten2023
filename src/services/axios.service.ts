import axios, {AxiosResponse} from 'axios';

import {baseURL} from '../configs/urls';

type IRes<T> = Promise<AxiosResponse<T>>
//Типизация axios мы делаем дополнительный тип которому присваиваем. Тип будет равен Promise его джейнерик
// будет AxiosResponse и в него будет передаваться то что мы при использовании типа IRes передадим в джейнерик.
// Пример использования в car.service.ts
const axiosService = axios.create({baseURL});
//Если ключ и значение совпадает {baseURL:baseURL}  можно писать только ключ.

export {
    axiosService,
}

//!!! Для экспорта типов необходимо использовать отдельный экспорт.
export type {
    IRes
}

