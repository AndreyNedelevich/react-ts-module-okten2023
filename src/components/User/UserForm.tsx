import {SubmitHandler, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {FC} from "react";
import {Dispatch, SetStateAction} from "react";


import {service} from "../../services/service";
import { UserValidator} from "../../validators/validate";
import {IUser} from "../../interfaces/User.interface";

interface IProps {
    setUsers: Dispatch<SetStateAction<IUser[]>>
}


const UserForm: FC<IProps> = ({setUsers}) => {
    const {
        reset, formState: {errors, isValid},
        register, handleSubmit
    } = useForm<IUser>({mode: 'all',resolver: joiResolver(UserValidator)});




    const save: SubmitHandler<IUser> = async (user) => {
        const {data} = await service.createUser(user);
        console.log(data);
        setUsers((prevState) => {
            return [...prevState, data];
        })
        reset()
    };




    return (
        <form className='form' onSubmit={handleSubmit(save)}>
            <input type="text" placeholder={' name'} {...register('name')}/>
            {errors.name && <span>{errors.name.message}</span>}
            <input type="text" placeholder={'username'} {...register('username')}/>
            {errors.username && <span>{errors.username.message}</span>}
            <input type="text" placeholder={'email'} {...register('email')}/>
            {errors.email && <span>{errors.email.message}</span>}
            <button disabled={!isValid}>save</button>
        </form>
    );
};

export {UserForm};