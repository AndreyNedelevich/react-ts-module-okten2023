import {FC, useEffect, useState} from 'react';
import {useAppLocation} from '../hooks/router.hooks';
//Експорт кастомного хука с дополненной типизацией state
import {IUser} from '../interfaces/user.interface';
import {UserDetails} from '../components/UserDetails';
import {useParams} from 'react-router-dom';
import {userService} from '../services/user.service';

const UserDetailsPage: FC = () => {
    const {id} = useParams();
    //useParams() - как правило не типизируют.
    const {state} = useAppLocation<IUser>();
    //спользуем кастомный хук useAppLocation. Так как мы дополнили его типизацию в файле router.hooks.ts
    //Сдесь мы ее сразу же вызываем. И передаем в ее джейнерик интерфейс типизации объекта.

//Первый вариант с указанием доп свойства по игнорированию присваивания объектам null (   "strictNullChecks": false,) в файле tsconfig
    const [user, setUser] = useState<IUser>(null);



    useEffect(() => {
        //Внутри useEffect делаем проверку когда внутри state (из кастомного хука нет useAppLocation ) не данных тоисть равен folse наченю
        //Тогда чрабатывает подгрузка данных с API
        if (!state){
            userService.getById(id).then(value => value.data).then(value => setUser(value));
        }else {
            setUser(state)
            //Если в state присутствует объект с данными (true значения) тогда мы просто при помощи функции диспетчера присваиваем его дныые в переменную
            //сотосяния и далее они просто отображаються в UI
        }
    }, [id, state])
    return (
        <div>
            {user && <UserDetails user={user}/>}
        </div>
    );
};

export {UserDetailsPage};
