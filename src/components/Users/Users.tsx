import React, {FC} from 'react';
import {User} from './User';
import { IUser} from "../../interfeces";

interface IProps {
    users:IUser[]
}
const Users:FC<IProps> = ({users}) => {

    return (
        <div className='block'>
            {users.map(user=><User key={user.id} user={user}/>)}
        </div>
    );
};

export {Users};