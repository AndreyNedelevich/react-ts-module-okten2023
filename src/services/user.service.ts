import {axiosServicePlaceholder} from "./axios.service";
import { urlsPlaceholderApi} from "../constans/urls";
import {IRes} from "../types";
import { IUser} from "../interfeces";

const userService = {
    getAll:  ():IRes<IUser[]> =>    axiosServicePlaceholder.get(urlsPlaceholderApi.users),
    getByIdUser: (id:number):IRes<IUser>=>axiosServicePlaceholder.get(urlsPlaceholderApi.getByIDUser(id)),
    create: (user:IUser):IRes<IUser>=> axiosServicePlaceholder.post(urlsPlaceholderApi.users, user)
}


export {
    userService
}