import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {AppDispatch, RootState} from '../redux';

//Создаем хуки с которых будем возвращать типизированные useSelector  и   useDispatch.

//Типизировать их дудем с помощью тех типов которые были определенны в файле store при помощи метода ts - ReturnType
//Так же что бы его протипизировать есть специальный  тип TypedUseSelectorHook импортируем из библиотеки react-redux
// В качестве его джейнерика кладем RootState (получили в файле store).
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

//Кастомный типизированный хук для useDispatch в качестве джейнерика передаем AppDispatch (его получили в файле store)
// При определение того типа который возвращает библиотечная функция configureStore. Далее мы в файле store ы также определили
// подтип ее метода [dispatch] анный подтип и используем для создание кастомного хука useAppDispatch.
const useAppDispatch = () => useDispatch<AppDispatch>()

export {
    useAppDispatch,
    useAppSelector
}
