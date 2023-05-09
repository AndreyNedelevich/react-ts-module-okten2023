import {TypedUseSelectorHook, useSelector,useDispatch} from "react-redux";

import {AppDispatch, RootState} from "../reducers";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const useAppDispatch = () => useDispatch<AppDispatch>()

export {
    useAppDispatch,
    useAppSelector
}