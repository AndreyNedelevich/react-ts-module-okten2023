import {FC} from 'react';

import {ICar} from '../interfaces/car.interface';
import {IUseState} from '../types/useState.type';
import {carService} from '../services/car.service';

interface IProps {
    car: ICar;
    setCarForUpdate: IUseState<ICar | null>;
    setOnChange: IUseState<boolean>;
}
//Типизация пропсов. Если передаеться функция суттер то типизируем при помощи импортируемого типа IUseState а вего джейнерике
// указываем интерфейст или просто тип данных. Если возможны два типа то при помощи **|**  указываем их.

const Car: FC<IProps> = ({car, setCarForUpdate, setOnChange}) => {
    const {id, brand, price, year} = car;

    const deleteCar = async () => {
        await carService.deleteById(id);
        setOnChange(prevState => !prevState)

    };

    return (
        <div style={{display: 'flex'}}>
            <div>
                <div>id: {id}</div>
                <div>brand: {brand}</div>
                <div>price: {price}</div>
                <div>year: {year}</div>
            </div>
            <div style={{display: 'flex', margin: '5px'}}>
                <button onClick={() => setCarForUpdate(car)}>update</button>
                <button onClick={() => deleteCar()}>delete</button>
            </div>
        </div>
    );
};

export {Car};
