import {NavLink} from 'react-router-dom';
import {useEffect} from 'react';

import css from './Header.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {authService} from '../../services';
import {authActions} from '../../redux';

const Header = () => {
    // При помощи кастомного типизованого хука useAppSelector получаем из хранилища данные о пользователя что бы их отображать в header если пользователь авторизовался.
    const {me} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        //Если в переменной состояния !null(даст true) но при этом в LocaleStorage есть ключ с инфорацией accessKey (даст true)
        // вызываем метод dispatch и с его помощью вызывем метод asynkThunk  me() для получения данные в переменную состояния me.
        if (!me && authService.getAccessToken()) {
            dispatch(authActions.me())
        }
    }, [me, dispatch])

    return (
        <div className={css.Header}>
            <div>Logo</div>
            {
                me ?
                    <div>
                        <span>{me.username}</span>
                        <button>Logout</button>
                    </div>
                    :
                    <div>
                        <NavLink to={'login'}>Login</NavLink>
                        <NavLink to={'register'}>Register</NavLink>
                    </div>
            }
        </div>
    );
};

export {Header};
