import {axiosServicePlaceholder} from "./axios.service";
import {urlsPlaceholderApi} from "../constans";
import {IRes} from "../types";
import {IComment} from "../interfeces";

const commentService = {
    getAll:()=>axiosServicePlaceholder.get(urlsPlaceholderApi.comments),
    getByIdComment: (id:number):IRes<IComment>=>axiosServicePlaceholder.get(urlsPlaceholderApi.getByidComment(id)),
    getByIdCommentsPost:(id:number):IRes<IComment>=>axiosServicePlaceholder.get(urlsPlaceholderApi.getCommentsByIdPost(id)),
}


export {
    commentService
}
