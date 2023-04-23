import {IRes} from "../types/axiosRes.type";
import {IPost} from "../interface/allInterface";
import {axiosService} from "./axios.service";
import {urls} from "../constans/urls";

const PostService = {
    getAll: (): IRes<IPost[]> => axiosService.get(urls.users.posts),
    getByIdPost: (id:string): IRes<IPost>=>axiosService.get(urls.users.byPostId(id))
}

export {
    PostService
}
