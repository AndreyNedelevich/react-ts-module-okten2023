import React from 'react';
import {useNavigate} from "react-router-dom";
import {IPost} from "../../interface/allInterface";
import {FC} from "react";

interface iProps {
    post: IPost;
}
const Post:FC<iProps> = ({post}) => {

    let navigate = useNavigate();

    return (
        <div>
            {post.id} {post.title}
            <button onClick={() => {
                navigate(post.id.toString());
            }}>details of post
            </button>
        </div>
    );
};

export default Post;