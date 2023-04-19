import {FC} from 'react';
import {IUser} from "../../interfaces/User.interface";

interface IProps {
    user: IUser
}

const User:FC<IProps> = ({user}) => {
    const {id, name,username, email,} = user;



    return(
        <div className='wrapper'>
     <div>id: {id}</div>
    <div>name: {name}</div>
    <div>username: {username}</div>
    <div>email: {email}</div>

    </div>
);
};

export {User};
