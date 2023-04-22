import {IRes} from "../types/axiosRes.type";
import {IUser} from "../interface/allInterface";
import {axiosService} from "./axios.service";
import {urls} from "../constans/urls";

const userService = {
    getAll: (): IRes<IUser[]> => axiosService.get(urls.users.users),
    getByIdUser: (id: string): IRes<IUser> => axiosService.get(urls.users.byUserId(id)),
    create: (user: IUser): IRes<IUser> => axiosService.post(urls.users.users, user)
}

export {
    userService
}