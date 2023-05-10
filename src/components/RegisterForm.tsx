import {SubmitHandler, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {useNavigate} from 'react-router-dom';

import {IAuth} from '../interfaces';
import {authValidator} from '../validators';
import {useAppDispatch, useAppSelector} from '../hooks';
import {authActions} from '../redux';

const RegisterForm = () => {
    const dispatch = useAppDispatch();

    const {error} = useAppSelector(state => state.authReducer);
    //Длстаем из slice состояния ошибки лоя того что бы иметь возможность отследить ситуацию если после отправки данных для регистрации
    //нового пользователя мы получим ошибку что такой пользователь уже существует.
    // Далее внизу под формой прописываем логику отображения данной ошибки в UI

    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(authValidator)
    });

    const registerUser: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.register(user));
        //Внутри функции вызваем  dispatch и передаем в него asynkThank register с данными пользователя котрого хотим зарегистрировать
        // на API
        //Далее после отправки запросса на регистрацию. Создаем логику если запрос был успешен то в  ответ веренться requestStatus
        // "fulfilled", если зпрос не рузультативный то вернеться "rejected"
        //Из самого dispatch есть meta и из нее можно вытянуть requestStatus (с результатом запроса)
        if (requestStatus === 'fulfilled') {
            //Если запрос на регистрацию был успешен то пользователя сразу же перебросит на страцу для логина.(вход в кабинет)
            navigate('/login')
        }
    };

    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <input type="text" placeholder={'username'} {...register('username')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button disabled={!isValid}>Register</button>
            {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
            {/*При помощи Object.keys мы получаем массив из ключей объекта. Если его длинна болше 0 то отображаем div при помщи
            Object.values получаем массив и забираем из него первый элемент и выводим из него message*/}
            {error && <div>{error.username[0]}</div>}
        {/*    Изначально в error  (null) но как только при регистрации мы получим ошибку (такой пользователь уже сущесвует)
         ТО м после логиеского and ы выведим div с информацией текста ошибки из массива username первогоэлемента. */}
        </form>
    );
};

export {RegisterForm};
