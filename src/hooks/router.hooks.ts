import {useLocation,Location} from "react-router-dom";

interface IState<T> extends Location{
    state:T
}

const useAppLocation=<K>():IState<K>=>useLocation()
//Это функция у котрой есть свой джейнерик. Который мы передаем при ее вызове.

export {useAppLocation}
