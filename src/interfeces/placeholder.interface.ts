export interface IUser{
    id:number;
    name:string;
    username:string;
    email:string,
}

export interface IPosts{
userId:number,
    id:number,
    title:string,
    body:string
}

export interface IAlbom{
    id:number,
    title:string
}

export interface IComment{
    id:number,
    name:string,
    email:string,
    body:string
}

export interface ITodos{
    id:number,
    title:string,
}