import {Dispatch, SetStateAction, useState} from 'react';
import {IUser} from "../interfaces/user.interface";

export type ISetState<T> = Dispatch<SetStateAction<T>>

//В данном файле типизация для повторного использования в Компонентах. Если мы передаем функцию дтспетчер для изменеия
//состояния мы типизируем эту функцию в получаемом компоненте в Iprops.
// interface IProps {
//     user: IUser;

// }
