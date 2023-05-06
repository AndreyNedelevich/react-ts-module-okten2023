import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {carReducer} from './slice';

const rootReducer = combineReducers({
    carReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
})

//Так как мы не знаем какие канкрено типы будут возвращаеться с некоторых частей вызываемых функций
//из библиотеки reduxjs/toolkit
//Типы которые будут возвращаться из функций будет определять при помощи метода ReturnType и в его джейнерик указываем функцию
//чей возвращаемый тип хотим узнать.

type RootState = ReturnType<typeof rootReducer>
// определяем тип котрый будет возвращать из  функции combineReducers в переменную rootReducer.

type AppStore = ReturnType<typeof setupStore>
// определяем тип котрый будет возвращать из  функции configureStore в переменную setupStore.

type AppDispatch = AppStore['dispatch']
// Далее определяем подтип AppStore  и з нас интерсует подтип под название ['dispatch'].
//Таким образом получаем возможность типизировать функциию которая возвращаеться из хука useDispatch().

//К примеру если бы мы не знали какой тип возвращает axios то мы могли бы его определить при помощи  ReturnType<  >. В джейнерике указываем  переменную
// тип которой мы хоти определить. Так как в нее вызываеться не наша функция.
export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}

