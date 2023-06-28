import {SubmitHandler, useForm} from 'react-hook-form';
// SubmitHandler экспортировался из react-hook-form для типизации самого события в функции save и в качестве дженерика в нем указываем interfece объекта.
import {ICar} from '../interfaces/car.interface';
import {carService} from '../services/car.service';

const CarForm = () => {
    //Хук useForm типизируем указываем что он будет получать объект типизированный интерфейсом <ICar>
    const {reset, register, handleSubmit} = useForm<ICar>();

    // Функция save типизируем при помощи експортируемого метода SubmitHandler из библиотеки react-hook-form  в качестве джейнерика указываем у него <ICar>
    const save:SubmitHandler<ICar> = async (car) => {
        await carService.create(car)
        reset()
    };

    return (
        <form onSubmit={handleSubmit(save)}>
            <input type="text" placeholder={'brand'} {...register('brand')}/>
            <input type="text" placeholder={'price'} {...register('price')}/>
            <input type="text" placeholder={'year'} {...register('year')}/>
            <button>save</button>
        </form>
    );
};

export {CarForm};
