import {combineReducers,configureStore} from "@reduxjs/toolkit";
import {reducerPlaceholder} from "./placeholder.reducer";
import {reducerLoggin} from "./loggin.reducer";

const rootReducer=combineReducers({
    reducerPlaceholder,
    reducerLoggin
})


const setupStore=()=>configureStore({
    reducer:rootReducer
})


type RootState=ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch=AppStore['dispatch']


export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}







