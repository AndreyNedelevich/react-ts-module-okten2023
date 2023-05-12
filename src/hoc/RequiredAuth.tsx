import {FC, ReactElement} from 'react';
import {authService} from '../services';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../hooks';

interface IProps {
    children: ReactElement
}
//ипизируем данный компонент на момент того что внутри него будут   children а в них элементы с типом  ReactElement

const RequiredAuth: FC<IProps> = ({children}) => {
    const accessToken = authService.getAccessToken();
    //При пмощи вызова метода из сервиса getAccessToken() получаем в перемннную токенны

    if (!accessToken) {
        //При попадании в компоненту. Если токенов нет в localStorage то получаем !false (меняем на true) соответственно
        // Комопнента Navigate делает нам переадресацию на комопненту для Логина
        return <Navigate to={'/login'}/>
    }
//Если токены есть то мы отображаем те компоненты которые обернуты компонентом RequiredAuth
    return children
};

export {RequiredAuth};

// const RequiredAuth: FC<IProps> = ({children}) => {
//     const {me} = useAppSelector(state => state.authReducer);
//
//     if (!me) {
//         return <Navigate to={'/login'}/>
//     }
//
//     return children
// };
//
// export {RequiredAuth};