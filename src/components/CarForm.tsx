import {SubmitHandler, useForm} from 'react-hook-form';
import {FC, useEffect} from 'react';
import {joiResolver} from '@hookform/resolvers/joi';

import {ICar} from '../interfaces/car.interface';
import {carValidator} from '../validators/car.validator';
import {carService} from '../services/car.service';
import {IUseState} from '../types/useState.type';

interface IProps {
    setOnChange: IUseState<boolean>;
    carForUpdate: ICar | null;
    setCarForUpdate: IUseState<ICar | null>;
}

const CarForm: FC<IProps> = ({setOnChange, carForUpdate, setCarForUpdate}) => {
    const {register, handleSubmit, reset, formState: {errors, isValid}, setValue} = useForm<ICar>({
        mode: 'all',
        resolver: joiResolver(carValidator)
    });

    useEffect(() => {
        if (carForUpdate) {
            // Object.entries вернет массив из массивов. Первый элемент массива будет ключ второй элемент значения.
            Object.entries(carForUpdate).forEach(([key, value]) => {
                //На каждой итерации будем получать массив. Первый[0] - ключ второй[1]-значение
                if (key !== 'id') {
                    setValue(key as keyof ICar, value, {shouldValidate: true})
                }
            })
        }

    }, [carForUpdate, setValue])
    //
    const save: SubmitHandler<ICar> = async (car) => {
        await carService.create(car);
        setOnChange(prevState => !prevState)
        reset()

    };

    const update: SubmitHandler<ICar> = async (car) => {
        await carService.updateById(carForUpdate!.id, car)
        //В данной строчке кода так как carForUpdate может лежать null. Но мы точно уверенны что при выполнении кода там будет
        //объект с обновленным Car мы простоавляем воскрицательный знак **!**. Что бы снять ошибку типизаци.
        setOnChange(prevState => !prevState)
        reset()
        setCarForUpdate(null)

    };

    return (
        <div>
            <form onSubmit={handleSubmit(carForUpdate ? update : save)}>
                {/*Логика изменеия вызова функция в зависмости от булиан значения в переменной carForUpdate*/}
                <input type="text" placeholder={'brand'} {...register('brand')}/>
                <input type="text" placeholder={'price'} {...register('price')}/>
                <input type="text" placeholder={'year'} {...register('year')}/>
                <button disabled={!isValid}>{carForUpdate ? 'Update' : 'Save'}</button>
            </form>
            <div>
                {errors.brand && <div>{errors.brand.message}</div>}
                {errors.price && <div>{errors.price.message}</div>}
                {errors.year && <div>{errors.year.message}</div>}
            </div>
        </div>
    );
};

export {CarForm};
