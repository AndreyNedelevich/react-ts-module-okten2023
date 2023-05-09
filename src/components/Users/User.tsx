import {useNavigate} from 'react-router-dom';
import {FC} from "react";
import {IUser} from "../../interfeces";

interface IProps {
    user: IUser
}

const User: FC<IProps> = ({user}) => {

    const navigate = useNavigate();
    const {id, name} = user;



    return (
        <div>
            <div>id: {id}</div>
            <div>name: {name}</div>
            <button onClick={()=>navigate(`${id}`, {state:{...user}})}>Детали о Пользователе</button>
            <button onClick={()=>navigate(`${id}/posts`, {state:{...user}})}>Посты Пользователя</button>
        </div>
)
}

export {User};