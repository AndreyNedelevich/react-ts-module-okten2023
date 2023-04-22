import {axiosService} from "./axios.service";

import {urls} from "../constans/urls";
import { ITodos} from "../interface/allInterface";
import {IRes} from "../types/axiosRes.type";

const todoService = {
    getAll:():IRes<ITodos[]>=>axiosService.get(urls.users.todos)
}

export {
   todoService
}