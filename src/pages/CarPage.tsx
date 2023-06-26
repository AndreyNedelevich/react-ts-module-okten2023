import {FC, useEffect, useState} from 'react';

import {CarForm} from '../components/CarForm';
import {Cars} from '../components/Cars';
import {ICar} from '../interfaces/car.interface';
import {carService} from '../services/car.service';

interface IProps {

}

const CarPage: FC<IProps> = () => {
    const [cars, setCars] = useState<ICar[]>([]);
    const [onChange, setOnChange] = useState<boolean>(false);
    const [carForUpdate, setCarForUpdate] = useState<ICar | null>(null);
//В состоянии carForUpdate типизируем так что бы были предусмотренны два варианта при помощи указание в джейнерике useState **|**(<ICar | null>)
    //будет или интерфейс ICar или null
    useEffect(() => {
        carService.getAll().then(value => value.data).then(value => setCars(value))
    }, [onChange])

    return (
        <div>
            <CarForm setOnChange={setOnChange} carForUpdate={carForUpdate} setCarForUpdate={setCarForUpdate}/>
            {/*Передаем в CarForm необходимые функции сеттеры изменения состояния */}
            <hr/>
            <Cars cars={cars} setCarForUpdate={setCarForUpdate} setOnChange={setOnChange}/>
        {/*  Передаем функцию изменения состояния onChange для вызова ее сразу же после удаление какгог то CAr для
        того что бы обновить список наших Cars в листе.*/}
        </div>
    );
};


export {CarPage};
