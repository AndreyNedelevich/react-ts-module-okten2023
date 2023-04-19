import {axiosService, IRes} from './axios.service';
import {ICar} from '../interfaces/car.interface';
import {urls} from '../configs/urls';

const carService = {
    getAll: (): IRes<ICar[]> => axiosService.get(urls.cars),
    //ИСпользуем экспортируемый тип IRes и в качестве джейнерика передаем что это будет массив данных с типами из интерфейса ICar
    create: (car: ICar): IRes<ICar> => axiosService.post(urls.cars, car),
    //Сдесь в джейнерике не используем массив так как в ответ будем получать только один Car
    updateById: (id: number, car: ICar): IRes<ICar> => axiosService.put(`${urls.cars}/${id}`, car),
    //Сдесь в джейнерике не используем массив так как в ответ будем получать только один Car
    deleter: (id: number): IRes<void> => axiosService.delete(`${urls.cars}/${id}`)
    //Так как в ответ на запрос delete нет возврата каких либо данных поэтому указываем в джейнерике <void>
}


export {
    carService
}
