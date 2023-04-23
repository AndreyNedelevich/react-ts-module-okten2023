export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
}

export interface IAlbum{
    id:number;
    title:string;
}

export interface ITodos{
    id:number;
    title:string;
    completed:boolean;
}

export interface IPost{
    id:number;
    title:string;
    body:string;
}

export interface IComment{
    postId:string;
    id:number;
    name:string;
    email:string;
    body:string;
}