import {axiosService} from "./axios.service";

import {urls} from "../constans/urls";
import {IAlbum} from "../interface/allInterface";
import {IRes} from "../types/axiosRes.type";

const albumService = {
    getAll:():IRes<IAlbum[]>=>axiosService.get(urls.users.albums)
}

export {
    albumService
}