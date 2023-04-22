import {AxiosResponse} from 'axios';

export type IRes<T> = Promise<AxiosResponse<T>>
//Шаблон типизации тех данных которые мы получаем при запросе на сервис при помощи axios. Тип указываем Promise а в джейнерике указываем
// специальный импортируемый тип из библиотеки axios