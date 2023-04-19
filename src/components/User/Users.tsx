import {useEffect, useState} from 'react';
import {User} from "./User";
import {FC} from "react";

import {UserForm} from "./UserForm";
import {service} from "../../services/service";
import {IUser} from "../../interfaces/User.interface";
interface IProps {

}

const Users:FC<IProps> = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        // @ts-ignore
        service.getAllUser().then(value => value.data).then(value => setUsers(value))
    }, [])

    return (
        <div>
            <UserForm setUsers={setUsers}/>
            {/*<CommentForm setComments={setComments}/>*/}
            <hr/>
            {users.map(user=><User user={user} key={user.id}/>)}
        </div>
    );
};

export {Users};
