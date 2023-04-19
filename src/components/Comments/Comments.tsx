import {useEffect, useState} from 'react';

import {CommentForm} from "./CommentForm";
import { serviceComment} from "../../services/service";
import {Comment} from "./Comment";
import {IComment} from "../../interfaces/Comment.interface";



const Comments = () => {
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        serviceComment.getAllComment().then(value => value.data).then(value => setComments(value))
    }, [])

    return (
        <div className='block'>
            <CommentForm setComments={setComments}/>
            <hr/>
            {comments.map(comment=><Comment comment={comment} key={comment.id}/>)}
        </div>
    );
};

export {Comments};
