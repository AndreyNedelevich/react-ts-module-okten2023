import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IPost} from "../../interface/allInterface";
import {userService} from "../../service/post.service";


const PostDetails: FC = () => {

    let {id} = useParams();
    let [post, setPost] = useState<IPost>(null);

    useEffect(() => {
        userService.getByIdPost(id).then(value => value.data).then(value => setPost(value));
        console.log('effect')
    }, [id]);

    return (
        <div>
            {
                post &&
                <div>
                    <div><strong>id</strong>-{post.id}</div>
                    <div><strong>title:</strong> {post.title}</div>
                    <div><strong>body:</strong>  {post.body}</div>
                </div>
            }

        </div>
    );
};

export default PostDetails;