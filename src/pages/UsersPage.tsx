import React, {FC, useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {placeholderActions} from "../reducers";
import {useAppDispatch,useAppSelector} from "../hooks";
import {useDispatch} from "react-redux";
import {Loader,Error} from "../components";
import {Users} from "../components";



const UsersPage:FC = () => {


    const {users,errors,loading}=useAppSelector(state => state.reducerPlaceholder)
    const dispatch=useAppDispatch()

   useEffect(()=>{
       dispatch(placeholderActions.getAll())
   },[dispatch])


    return (
        <div style={{margin: 15}} >
            <Outlet/>

            <h1>Users</h1>
            {loading ?
                <Loader/>
                :
                <React.Fragment>
                    {errors.users?
                        <Error error={errors.users}/> :
                        <Users users={users}/>
                    }
                </React.Fragment>
            }
        </div>
    );
};

export {UsersPage};