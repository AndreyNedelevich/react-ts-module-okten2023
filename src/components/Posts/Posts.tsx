import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";

import {IPost} from "../../interface/allInterface";
import {PostService} from "../../service/post.service";
import Post from "./Post";

const Posts = () => {
    let [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        PostService.getAll().then(value => value.data).then(value => setPosts(value));
    }, [])

    return (
        <div>
            <div>
                <h4>post details view</h4>
                <Outlet/>
            </div>
            <div>
                <h3>All posts</h3>
                {
                    posts.map(value => <Post post={value} key={value.id}/>)
                }
            </div>
        </div>
    );
};

export default Posts;