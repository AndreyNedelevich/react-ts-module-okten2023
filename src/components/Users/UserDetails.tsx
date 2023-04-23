import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {useAppLocation} from "../../hooks/router.hooks";
import {IUser} from "../../interface/allInterface";
import {userService} from "../../service/user.service";

const UserDetails = () => {
    const {id} = useParams();
    const {state}=useAppLocation<IUser>()
    const [user, setUser] = useState<IUser>(null);

    useEffect(
        ()=>{
            if(!state){
                userService.getByIdUser(id).then(value => value.data).then(value => setUser(value))
            }else {
                setUser(state)
            }
       },[id,state]
    )

    return (
        <div className='postInfo'>
            {user && <div>
                <div>id: {state.id}</div>
                <div>name: {state.name}</div>
                <div>username: {state.username}</div>
                <div>email: {state.email}</div>
            </div>}
        </div>

    );
};

export default UserDetails;