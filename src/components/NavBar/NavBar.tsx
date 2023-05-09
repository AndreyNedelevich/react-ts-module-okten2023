import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import css from './NavBar.module.css';
import {NavLink} from "react-router-dom";
import {logginActions} from "../../reducers";

const NavBar = () => {
    const dispatch=useAppDispatch()
    const isLoggedIn  =  useAppSelector(state => state.reducerLoggin.isUserLoggedIn)


    const logout = () => {
        dispatch(logginActions.changeIsUserLoggedIn(false));
        localStorage.removeItem('auth')
    }

    return (
        <div className={css.Header}>
            {isLoggedIn &&
                <React.Fragment>
                    <NavLink to={'users'}>Users</NavLink>
                    <NavLink to={'posts'}>Posts</NavLink>
                    <NavLink to={'comments'}>Comments</NavLink>
                    <NavLink to={'albums'}>Albums</NavLink>
                    <NavLink to={'todos'}>Todos</NavLink>
                    <button className='button' onClick={logout}>Выйти</button>
                </React.Fragment>
            }
        </div>
    );
};

export {NavBar};