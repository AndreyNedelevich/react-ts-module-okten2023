import {useEffect, useState} from 'react';
import {ICar} from '../interfaces/car.interface';
import {carService} from '../services/car.service';
import {Car} from './Car';
import {CarForm} from './CarForm';

const Cars = () => {
    const [cars, setCars] = useState<ICar[]>([]);
    //Хук useState тоже обезательно необходимо типизировать. Указываем что в него будет приходить массив данных с полями из
    //интерфейса ICar

    useEffect(() => {
        carService.getAll().then(value => value.data).then(value => setCars(value))
    }, [])

    return (
        <div>
            <CarForm/>
            <hr/>
            {cars.map(car=><Car car={car} key={car.id}/>)}
        </div>
    );
};

export {Cars};
