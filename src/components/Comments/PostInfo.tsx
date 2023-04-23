import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {PostService} from "../../service/post.service";
import {IPost} from "../../interface/allInterface";



const PostInfo:FC = () => {
    let {postId} = useParams();

    let [post, setPost] = useState<IPost>(null);



    useEffect(() => {
        PostService.getByIdPost(postId)
            .then(value => value.data)
            .then(value => {
                setPost({...value});
            });
    }, [postId]);



    return (
        post &&
        <div className='postInfo'>
            <div>id: {post.id}</div>
            <div>title: {post.title}</div>
            <div>body: {post.body}</div>
        </div>

    );
};

export default PostInfo;
