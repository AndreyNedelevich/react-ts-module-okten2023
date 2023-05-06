import {AxiosResponse} from 'axios';

export type IRes<T> = Promise<AxiosResponse<T>>
//Тип с джейнериком для сервисов. В котрых возвращаеться Промисс. В джейнерик типизированный объект.
