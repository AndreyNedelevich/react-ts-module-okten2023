import {SubmitHandler, useForm} from 'react-hook-form';
import {IComment} from "../../interfaces/Comment.interface";
import {FC} from "react";
import {joiResolver} from '@hookform/resolvers/joi';
import {Dispatch, SetStateAction} from "react";

import {service} from "../../services/service";
import {CommentValidator} from "../../validators/validate";


interface IProps{
    setComments:Dispatch<SetStateAction<IComment[]>>
}


const CommentForm:FC<IProps> = ({setComments}) => {
    const {reset,formState:{errors, isValid},
        register, handleSubmit} = useForm<IComment>({ mode: 'all', resolver: joiResolver(CommentValidator)});


    const save:SubmitHandler<IComment> = async (comment) => {
       const {data}=  await service.createComment(comment);
        console.log(data);
        setComments((prevState)=>{
            return [...prevState, data];
        })
        reset()
    };

    return(
        <form onSubmit={handleSubmit(save)}>
            <input type="text" placeholder={'name'} {...register('name')}/>
            {errors.name && <span>{errors.name.message}</span>}
            <input type="text" placeholder={'email'} {...register('email')}/>
            {errors.email && <span>{errors.email.message}</span>}
            <input type="text" placeholder={'text Comment'} {...register('body')}/>
            {errors.body && <span>{errors.body.message}</span>}
            <button disabled={!isValid}>save</button>
        </form>
   );
};

export {CommentForm};


