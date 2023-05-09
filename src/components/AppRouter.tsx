
import React from 'react';
import {Routes,Route,Navigate} from "react-router-dom";
import {useAppSelector} from "../hooks";
import {UsersPage} from "../pages";
import {Login} from "./Login/Login";
import {UserDetails} from "./Users/UserDetails";


const AppRouter = () => {
    const isLoggedIn  =  useAppSelector(state => state.reducerLoggin.isUserLoggedIn)

    return (
        isLoggedIn?
            <Routes>
                <Route  path="/users" element={<UsersPage/>}>
                    <Route path={':id'} element={<UserDetails/>}/>
                </Route>
                {/*<Route  path="/posts" element={<PostsPage/>}>*/}
                {/*    <Route path={':id'} element={<PostDetails/>} />*/}
                {/*</Route>*/}
                {/*<Route  path="/users/:id/posts" element={<PostByUserPage/>}/>*/}
                {/*<Route  path="/post/:id/comments" element={<CommentsByPostPage/>}/>*/}
                {/*<Route  path="/comments" element={<CommentPage/>}>*/}
                {/*    <Route path={':postId'} element={<PostInform/>}/>*/}
                {/*</Route>*/}
                {/*<Route  path="/todos" element={<TodosPage/>}/>*/}
                {/*<Route  path="/albums" element={<AlbumsPage/>}/>*/}
                <Route index path="/*" element={<Navigate to="/users" replace/>}/>
            </Routes>
            :
            <Routes>
                <Route  path="/login" element={<Login/>}/>
                <Route index path="/*" element={<Navigate to="/login" replace/>}/>
            </Routes>
    );
};

export {AppRouter};