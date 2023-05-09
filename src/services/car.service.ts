import  {axiosServiceCars} from "./axios.service";
import {urlsCarsApi} from "../constans";
import {ICar} from "../interfeces";
import {IRes} from "../types";

const carService = {
    getAll: ():IRes<ICar[]>  => axiosServiceCars.get(urlsCarsApi.cars),
    create: (car:ICar):IRes<ICar> => axiosServiceCars.post(urlsCarsApi.cars, car),
    updateByIdCar: (id:number, car:ICar):IRes<ICar> => axiosServiceCars.put(urlsCarsApi.byIdCar(id), car),
    deleteByIdCar: (id:number):IRes<void>=> axiosServiceCars.delete(urlsCarsApi.byIdCar(id))
}


export {
    carService
}