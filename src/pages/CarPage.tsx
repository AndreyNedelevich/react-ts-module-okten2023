import {FC} from 'react';

import {CarForm, Cars} from '../components';
import {useAppSelector} from '../hooks';

const CarPage: FC = () => {
    const {errors} = useAppSelector(state => state.carReducer);
    //Вытягиваем из хранилища redux поле errors в которое помоещаеться информаци об ошибках в соответствующие поля.
    // Используем оператор ?.  для определение если поле существует дает true то выодим из конкретного поля ошибку.
    //ТОисть если в объекте errors одно или два поле даст true послое присваивании ошибки оно автоматически будет отображенно для пользователя.

    return (
        <div>
            <CarForm/>
            {errors?.detail && <h1>{errors.detail}</h1>}
            {errors?.brand && <h1>{errors.brand}</h1>}
            {errors?.price && <h1>{errors.price}</h1>}
            {errors?.year && <h1>{errors.year}</h1>}
            <Cars/>
        </div>
    );
};

export {CarPage};
