import React from 'react';
import {FC} from "react";

import {IAlbum} from "../../interface/allInterface";


interface IProps {
    album: IAlbum;
}

const Album:FC<IProps> = ({album}) => {

    return (
        <div className='wrapper'>
            <h4>{album.id}) {album.title}</h4>
        </div>
    );
};

export default Album;