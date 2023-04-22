import React, {FC} from 'react';
import {ITodos} from "../../interface/allInterface";

interface IProps {
    todo: ITodos;
}


const Todo:FC<IProps> = ({todo}) => {
    const {id,title,completed}=todo
    return (
        <div>
            <h3>{id}) {title}</h3>
            <div>completed - {completed.toString()}  </div>
        </div>
    );
};

export default Todo;