import {axiosService} from "./axios.service";

import {urls} from "../constans/urls";
import {IComment} from "../interface/allInterface";
import {IRes} from "../types/axiosRes.type";

const commentService = {
    getAll:():IRes<IComment[]>=>axiosService.get(urls.users.comments)
}

export {
    commentService
}