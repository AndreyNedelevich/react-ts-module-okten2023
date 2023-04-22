import React from 'react';
import {IAlbum} from "../../interface/allInterface";
import {FC} from "react";

interface IProps {
    album: IAlbum;
}

const Album:FC<IProps> = ({album}) => {

    return (
        <div>
            <h4>{album.id}) {album.title}</h4>
        </div>
    );
};

export default Album;