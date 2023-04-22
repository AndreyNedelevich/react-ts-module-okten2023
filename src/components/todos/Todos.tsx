import React, {FC, useEffect, useState} from 'react';
import axios from "axios";

import Todo from "./Todo";
import {ITodos} from "../../interface/allInterface";
import {todoService} from "../../service/todo.service";

const Todos:FC = () => {
    const [todos,setTodos]=useState<ITodos[]>([])

    const fetchAlbums=async ()=>{
        const response = await todoService.getAll()
        setTodos(response.data);
    }

    useEffect(()=>{
          fetchAlbums()
    },[])


    return (
        <div>
            {todos.map((item)=><Todo key={item.id} todo={item}/>)}
        </div>
    );
};

export default Todos;