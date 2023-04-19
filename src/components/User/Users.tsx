import {useEffect, useState} from 'react';
import {User} from "./User";
import {service} from "../../services/service";

import {IUser} from "../../interfaces/User.interface";


const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        // @ts-ignore
        service.getAllUser().then(value => value.data).then(value => setUsers(value))
    }, [])

    return (
        <div>
            {/*<CommentForm setComments={setComments}/>*/}
            <hr/>
            {users.map(user=><User user={user} key={user.id}/>)}
        </div>
    );
};

export {Users};
