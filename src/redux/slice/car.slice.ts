import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {ICar, IError} from '../../interfaces';
import {carService} from '../../services';

interface IState {
    cars: ICar[],
    errors: IError,
    trigger: boolean,
    carForUpdate: ICar
}


const initialState: IState = {
    //При помощи интерфейса IState  типизируем объект хранящийся в хранилище redux
    cars: [],
    errors: null,
    carForUpdate: null,
    trigger: false
};


//У метода createAsyncThunk из библиотеки  reduxjs/toolkit есть джейнерик в него можно передавать два параметра:
//1)Первый параметр ТО что мы будем возвращать при вызове  AsyncThunk  в компоненте. Другими словами то что попадет в Peyload () в данном примере это массив ICar[]
//2) Второй то что принимаем в ассинхронной функции. При вызове ее в компоненте.
const getAll = createAsyncThunk<ICar[], void>(
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAll();
            return data
        } catch (e) {
            //Пример работы  с as в typeScript
            // const car={bramd:'ddd'} as ICar //сли ситуация при которой мы не можем на прямую что то типизировать
            // то выносим отдельно и принудительно типизируем

            // const err:AxiosError=e as any    //Другой вариант записи
            const err = e as AxiosError
            // Сдесь мы при помощи as делаем принудительную типизацию той ошибки которую мы можем получить при отправке запросса при помощи
            //axios. Тип AxiosError получаем из самой библиотеки  Axios
            return rejectWithValue(err.response.data)
        }
    }
)

//В данном createAsyncThunk в его джейнерик мы передаем первым параметром 1) ТО что будет возвращать AsyncThunk (этот метода create не чего не будет возвращать)
// а второй то что мы передаем в параметр как аргумент при его вызове.
// При вызове метода create в него передаем объект новый car алее отправляеться запрос с ним на сервер и происходит записьновой машины в базе данных.
const create = createAsyncThunk<void, { car: ICar }>(
    'carSlice/create',
    async ({car}, {rejectWithValue}) => {
        try {
            await carService.create(car)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

//В данном примере в джейнерик reateAsyncThunk  для типизации мы  передаем  два аргумента:
//1) То что возвращает функция update при ее вызове. В данном примере не чего не попадает в payload
//2) ТО что будет передаваться в качестве аргумента. В функцию update. В данном примере это будет car: ICar, id: number (озле них и указываем типы.)

const update = createAsyncThunk<void, { car: ICar, id: number }>(
    'carSlice/update',
    async ({id, car}, {rejectWithValue}) => {
        try {
            await carService.updateById(id, car)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const deleteCar = createAsyncThunk<void, { id: number }>(
    'carSlice/deleteCar',
    async ({id}, {rejectWithValue}) => {
        try {
            await carService.deleteById(id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const slice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload
            })
            .addCase(update.fulfilled, state => {
                state.carForUpdate = null
            })
            .addMatcher(isFulfilled(), state => {
                state.errors = null
            })
            .addMatcher(isFulfilled(create, update, deleteCar), state => {
                state.trigger = !state.trigger
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload
            })
});

const {actions, reducer: carReducer} = slice;

const carActions = {
    ...actions,
    getAll,
    create,
    update,
    deleteCar
}

export {
    carActions,
    carReducer
}
