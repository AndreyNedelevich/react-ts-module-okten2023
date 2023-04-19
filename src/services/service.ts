import {axiosService, IRes} from './axios.service';
import {IUser} from '../interfaces/User.interface';
import {IComment} from "../interfaces/Comment.interface";
import {urls} from '../configs/urls';

const service = {
    getAllUser: ():IRes<IUser> => axiosService.get(urls.users),
    createUser: (user:IUser):IRes<IUser> => axiosService.post(urls.users, user),
    updateById: (id: number, user:IUser): IRes<IUser> => axiosService.put(`${urls.users}/${id}`, user),
    deleteUser: (id: number): IRes<void> => axiosService.delete(`${urls.users}/${id}`),

    getAllComment: ():IRes<IComment> => axiosService.get(urls.comments),
    createComment: (comment:IComment):IRes<IComment> => axiosService.post(urls.comments, comment),
    updateComment: (id: number, comment:IComment): IRes<IUser> => axiosService.put(`${urls.comments}/${id}`, comment),
    deleteComment: (id: number): IRes<void> => axiosService.delete(`${urls.comments}/${id}`),

}


export {
    service
}
