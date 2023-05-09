import React from 'react';
import {useAppDispatch} from "../../hooks";
import style from "./Login.module.css"
import {logginActions} from "../../reducers";

const Login = () => {

   const dispatch =  useAppDispatch()

    const login = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(logginActions.changeIsUserLoggedIn(true));
        localStorage.setItem('auth', 'true')
    }


    return (
        <div className={style.wrapper}>
            <h1>Страница для логина</h1>
            <form onSubmit={login} className={style.form} >
                <input className='input' type="text" placeholder="Введите логин"/>
                <input className='input' type="password" placeholder="Введите пароль"/>
                <button className='button'>Войти</button>
            </form>
        </div>
    );
};

export {Login};