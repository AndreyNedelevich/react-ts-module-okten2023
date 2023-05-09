import React from 'react';
import {useAppLocation} from "../../hooks";
import {IUser} from "../../interfeces";


const UserDetails = () => {

  const {state}=  useAppLocation<IUser>()

    return (
        <div className='block'>
            <h1>Информация о пользователе  {state.name}</h1>
            <div>
                <div>id: {state.id}</div>
                <div>name: {state.name}</div>
                <div>username: {state.username}</div>
                <div>email: {state.email}</div>
            </div>
        </div>
    );
};

export {UserDetails};