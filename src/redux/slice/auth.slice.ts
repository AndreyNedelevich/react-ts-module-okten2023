import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {IAuth, IErrorAuth, IUser} from '../../interfaces';
import {authService} from '../../services';

//Типизация IState  для initialState
interface IState {
    error: IErrorAuth;
    me: IUser;
}

const initialState: IState = {
    error: null,
    me: null
    //me - состояния в котором будет объект с данными залогиненого пользователя.
}

//Создаем AsyncThunk для того что бы отправить постовый зпрос с регистрационными данными.
const register = createAsyncThunk<void, IAuth>(
    //В джейнерике мы типизируем два аргумента:1)Что будет возвращаться с запросса. 2)Что передаем в сам запросс.
    'authSlice/register',
    async (user, {rejectWithValue}) => {
        try {
            await authService.register(user)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
            //Если ошибка то то возвращаем rejectWithValue и внего помещаем саму ошибку.
        }
    }
)

//Создаем AsyncThunk - login  для того что бы отправить постовый зпрос с  данными (login / password) что бы авторизирваться
// в ответполучить токенны (внести их в localeSorage) и вторый запросом в сервисе получить данные в виде объека залогиненного пользователя.
const login = createAsyncThunk<IUser, IAuth>(
    'authSlice/login',
    async (user, {rejectWithValue}) => {
        try {
            return await authService.login(user);
            //Врнет User
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

//Создаем createAsyncThunk под названием me для вызова его и получения данных об авторизированном пользователе.
const me = createAsyncThunk<IUser, void>(
    'authSlice/me',
    async () => {
        const {data} = await authService.me();
        return data
    }
)

const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            //Case который сработает при успешном запроссе на login
            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload
                // записываем в переменную состояния тот объект, который вернеться с запросса на сервер при логинации.
            })
            .addCase(me.fulfilled, (state, action) => {
                state.me = action.payload
                //В переменную состояния присваиваем объект и информацией о пользователе. Из ответа на запрос в API
            })
            .addMatcher(isFulfilled(), state => {
                state.error = null
                //Очень важно при успешном запросе на регистрацию нового пользователя. Очишаем переменную масива ошибки.
                //Снова присваиваем null.
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload as IErrorAuth
                //В addMatcher если в любом запросе будут какие либо ошибки они будут помещенны
            })
});

const {actions, reducer: authReducer} = slice;

const authActions = {
    ...actions,
    register,
    login,
    me
}

export {
    authReducer,
    authActions
}
