import React,{useEffect} from 'react';
import './App.css';
import {AppRouter} from "./components";
import {BrowserRouter} from "react-router-dom";
import {NavBar} from "./components";
import {useAppDispatch} from "./hooks";
import {logginActions} from "./reducers";


function App() {

    const dispatch=useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            dispatch(logginActions.changeIsUserLoggedIn(true));
        }
        // setLoading(false);
    }, [dispatch])

  return (
    <BrowserRouter>
        <NavBar/>
       <AppRouter/>
    </BrowserRouter>
  );
}

export {App}

