import React, {useEffect, useState} from 'react';

import Album from "./Album";
import {IAlbum} from "../../interface/allInterface";
import {albumService} from "../../service/album.service";


const Albums = () => {
    const [albums,setAlbums]=useState<IAlbum[]>([])

    const fetchAlbums=async ()=>{
        const response =  await albumService.getAll()
        setAlbums(response.data);
    }

    useEffect(()=>{
        fetchAlbums()
        console.log('useEffect')
    },[])


    return (
        <div>
            {albums.map((item,id)=><Album key={item.id} album={item}/>)}
        </div>
    );
};

export default Albums