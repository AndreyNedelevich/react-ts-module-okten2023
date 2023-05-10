import {AxiosResponse} from 'axios';

import {IAuth, ITokens, IUser} from '../interfaces';
import {IRes} from '../types';
import {axiosService} from './axios.service';
import {urls} from '../constants';

//Создание сервиссов в классовом стиле так как нам не необходимо будет использовать созданные методы внутри друних методов класса.
class AuthService {
    private readonly accessKey = 'access'
    private readonly refreshKey = 'refresh'
    // нутри класса создаем приватную переменные accessKey и refreshKey.


    //Первый метод будет register в нем мы будем запрос пост в котором мы будем отправлять объект user с данными по которым он должен быть зарегистрирован.
    register(user: IAuth): IRes<IUser> {
        //В аргументе передаем юзера типизированного интерфейсом IAuth, в отовет (response) будем получать данные нового зарегистрированного пользователя
        return axiosService.post(urls.auth.register, user)
    }

//Метод для отправки запрсса на вход в акаунт в ответ будем получать с сервера Tokens. При втором запроссе **me*** получем
    //данные о пользователе в виде объекта. Пэтому тх и типизируем как то что возврщает функция.
    async login(user: IAuth): Promise<IUser> {
        const {data}: AxiosResponse<ITokens> = await axiosService.post(urls.auth.login, user);
        //В запрос передаем данные юзера для авторизаци на сервере. data будут токены. Протипизированные как AxiosResponse в котором
        //интерфейс ITokens с типизацией
        this.setTokens(data)
        //Вызываем метод внутри класса и записываем токены в локел Сторедж.
        const {data: me}: AxiosResponse<IUser> = await this.me();
        //Так как мы делаем вторыым запросом запрос на получение данные о пользователе и он возвращает объект с данными.
        //Мы его возвращаем.В  методе login аргумент объект с (login / password)- ипизированный user: IAuth, возвращаем объект с данными user(типизированный Promise<IUser> )
        return me
    }


    // Метод для отправки запросса  при использовании refresh  токенна c целью если данный токен автквен то при помощи него мы должны получить
    //в ответ получить новый access tokken и refresh tokken. оответственно перезаписать их в localStarage
    async refresh(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            //Eсли вдруг refreshTokkena не будет в хранилище localStorage мы перевыбросим ошибку.
               throw new Error("Refresh token isn't exists")
        }
            const {data}: AxiosResponse<ITokens> = await axiosService.post(urls.auth.refresh, {refresh: refreshToken});
            //Отправляем запрос на адресс auth.refres для получения новых
            this.setTokens(data)
            //После отправки запроса на адресс на refresh и получения данных с новыми токенами. Вызываем метод внутри класса
            //setTokens (который кладет новые токенны в LocalStorage)



    }

    //Метод me при отправке запросса будет возвращать методом get нформацию о залогиненном пользователе (его данные)
    //Данный запрос сразу же вызваеться внутри сервиса login (ынутри класса)
    me(): IRes<IUser> {
        return axiosService.get(urls.auth.me)
    }

    //Функция setTokens при помощи которой мы будем сетать наши токенны в localeStorage.
    private setTokens({access, refresh}: ITokens): void {
        //КАк агрумент принимает объект с двумя полями  (2 токена) сразу же дистриктиризуем. Метож не чего не будет возвращать.
        localStorage.setItem(this.accessKey, access)
        localStorage.setItem(this.refreshKey, refresh)
        //Ложим данные токенов в localeStorage
    }

//Метод getAccessToken для того что бы вытянуть accesToken.accessKey с localeStorage
    getAccessToken(): string {
        return localStorage.getItem(this.accessKey)
    }

    //Метод getRefreshToken для того что бы вытянуть accesToken.refrash с localeStorage
    private getRefreshToken(): string {
        return localStorage.getItem(this.refreshKey)
    }

//Метод deleteTokens который будет удалять токены из localeStorage
    deleteTokens(): void {
        localStorage.removeItem(this.accessKey)
        localStorage.removeItem(this.refreshKey)
    }
}

export const authService = new AuthService()
//Експортируем просто const carService которая будет экземпляром класса CarService и в ней будут доступны все методы рдительского класса.
