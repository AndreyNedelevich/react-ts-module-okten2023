import React from 'react';
import {useNavigate} from "react-router-dom";
import {FC} from "react";

import {IPost} from "../../interface/allInterface";


interface iProps {
    post: IPost;
}
const Post:FC<iProps> = ({post}) => {

    let navigate = useNavigate();

    return (
        <div >
            {post.id} {post.title}
            <button onClick={() => {
                navigate(post.id.toString());
            }}>details of post
            </button>
        </div>
    );
};

export default Post;