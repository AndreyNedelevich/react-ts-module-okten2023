import {axiosServicePlaceholder} from "./axios.service";
import {urlsPlaceholderApi} from "../constans";
import {IRes} from "../types";
import {ICar} from "../interfeces";

const todoService = {
    getAll: ():IRes<ICar[]>=> axiosServicePlaceholder.get(urlsPlaceholderApi.todos),
}


export {
    todoService
}