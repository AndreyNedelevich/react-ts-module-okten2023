import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";

import {userService} from "../../service/user.service";
import {IUser} from "../../interface/allInterface";
import {User} from "./User";


const Users = () => {
    let [users, setUsers] = useState<IUser[]>([]);

    const fetchUsers=async ()=>{
       const response= await userService.getAll()
        setUsers(response.data)
    }

    useEffect(()=>{
        fetchUsers()
    },[])


return (
    <div>
        <h4>user details</h4>
        <Outlet/>
        {
            users.map(value => <User key={value.id} user={value}/>)
        }

    </div>
);
};

export default Users;