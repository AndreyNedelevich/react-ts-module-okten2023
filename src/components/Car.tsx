import {FC} from 'react';
import {ICar} from '../interfaces/car.interface';

interface IProps {
    car: ICar
}
//Прямо над самим компонентом типизируем те пропсы которые будут приходить в компонент в отдельном интерфейссе IProps.
//И указываем что именно внутри объекта IProps  ь+будет приходить вложенный объект с полями указаннми в интерфейсе ICar
const Car: FC<IProps> = ({car}) => {
    //В компоненте Сar мы типизируем при помощи специального интерфейса FC  из react
    const {id, brand, price, year} = car;
    const greeting = (id:number): void => {
        console.log('hello');
    }
    return (
        <div>
            <div>id: {id}</div>
            <div>brand: {brand}</div>
            <div>price: {price}</div>
            <div>year: {year}</div>
            <button onClick={() => greeting(1)}></button>
        </div>
    );
};

export {Car};
