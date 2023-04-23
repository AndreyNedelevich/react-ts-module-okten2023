import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";

import Comment from "./Comment";
import {IComment} from "../../interface/allInterface";
import {commentService} from "../../service/comment.service";



const Comments = () => {

    const[comments,setComments]=useState<IComment[]>([]);




    useEffect(()=>{
        const fetchComment=async ()=>{
            const response =  await commentService.getAll()
            setComments(response.data);
        }
        fetchComment();
    },[])


    return (
        <div>
            <Outlet/>
            <div className='block'>
                {comments.map((item)=><Comment key={item.id} comment={item}/>)}
            </div>
        </div>
    );
};

export default Comments;