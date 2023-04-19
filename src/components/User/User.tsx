import {FC} from 'react';
import {IUser} from "../../interfaces/User.interface";

interface IProps {
    user: IUser
}

const User:FC<IProps> = ({user}) => {
    const {id, name, email,address , phone, company, geo, website, username} = user;
    // sun: { open: openHours, closed: closdHours }
    return(
        <div className='wrapper'>
     <div>id: {id}</div>
    <div>name: {name}</div>
    <div>phone: {phone}</div>
    <div>email: {email}</div>
    <div>address: {address.city} str.{address.street} app.{address.suite}</div>
    <div>company: {company.name}</div>
    </div>
);
};

export {User};
