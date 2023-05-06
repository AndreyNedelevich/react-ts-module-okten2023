import {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../hooks';
import {Car} from './Car';
import {carActions} from '../redux';

const Cars: FC = () => {
    const {cars, trigger} = useAppSelector(state => state.carReducer);
    //Используем кастомный хук useAppSelector так как внутри него уже находитьмя протипизированный  хук useSellector()
    const dispatch = useAppDispatch();
    //Используем кастомный хук useAppDispatch()  так как внутри него уже находитьмя протипизированный  хук usDispatch()

    useEffect(() => {
        dispatch(carActions.getAll())
    }, [dispatch, trigger])

    return (
        <div>
            {cars.map(car => <Car key={car.id} car={car}/>)}
        </div>
    );
};

export {Cars};
