import {FC} from 'react';
import {IUser} from '../interfaces/user.interface';
import {useNavigate} from 'react-router-dom';

interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({user}) => {
    const navigate = useNavigate();
    const {id, name} = user;

    return (
        <div>
            <div>id: {id}</div>
            <div>name: {name}</div>
            <button onClick={()=>navigate(`${id}`, {state:{...user}})}>UserDetails</button>
        {/*  В navigate можно передать id данный хук произведет заменну в строку URL на что отреагирует react-router-dom
        и произойдет загрузка маршрута по соответствию id*/}
        {/* А также дополнительно параметр state в котороый передаеться объект с теми данными которые далее в компоненте на которую будет переход
         можно было отобразить их на странице вытянув их при помощи хука useAppLocation */}
        {/*    Другой вариант получить эти данные сделать запрос на сервер по id*/}
        </div>
    );
};

export {User};
