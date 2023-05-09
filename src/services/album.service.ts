import {axiosServicePlaceholder} from "./axios.service";
import {urlsPlaceholderApi} from "../constans";
import {IRes} from "../types";
import {IAlbum} from "../interfeces";


const albumService = {
    getAll: ():IRes<IAlbum>=> axiosServicePlaceholder.get(urlsPlaceholderApi.albums),
}

export {
    albumService
}