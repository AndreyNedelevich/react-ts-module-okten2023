import React, {FC} from 'react';


interface IProps {
    error:string
}

const Error:FC<IProps> = ({error}) => {

    let content = 'Вы перешли на несуществующую старницу';

    if (error) {
        content = 'Что то пошло не так!!!'
    }


    return (
        <div>
            <h1 style={{color: "red", textAlign: "center"}}>{content}</h1>
        </div>
    );
};

export  {Error};