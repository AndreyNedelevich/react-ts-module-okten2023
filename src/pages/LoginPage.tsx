import {LoginForm} from '../components';
import {useSearchParams} from 'react-router-dom';

const LoginPage = () => {
    const [query,] = useSearchParams();
    //Используем хук useSearchParams() - этот хук возвращает  query и setquery
    return (
        <div>
            {/*Прописываем логику  если в строке url есть queryyParams expSession то щначит мы были переброшенны на эту сстраницу
             // из за окночание авторизации выводим для пользователя информационное сообщение.*/}
            {query.get('expSession')&&<h1>Session expired... please login again!!!</h1>}
            <LoginForm/>
        </div>
    );
};

export {LoginPage};