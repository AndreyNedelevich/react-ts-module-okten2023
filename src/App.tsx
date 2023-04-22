import React from 'react';
import {Link,Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";

function App() {




  return (
      <div>
        <div>
          <h2>menu</h2>
          <ul>
            <li>
              <Link to={'/'}>home</Link>
            </li>
            <li>
              <Link to={'/layout'}>layout</Link>
            </li>
            <li>
              <Link to={'/todos'}>todos</Link>
            </li>
            <li>
              <Link to={'/albums'}>albums</Link>
            </li>

            <li>
              <Link to={'/about'}>about</Link>
            </li>
          </ul>
        </div>
   <Routes>
     <Route index element={<Home/>}/>
     <Route path={'/layout'} element={<Layout/>}>
       <Route path={'users'} element={<Users/>}>
         <Route path={':id'} element={<UserDetails/>}/>
       </Route>
       <Route path={'posts'} element={<Posts/>}>
         <Route path={':id'} element={<PostDetails/>} />
       </Route>
       <Route path={'comments'} element={<Comments/>}>
         <Route path={':Id'} element={<PostInfo/>} />
       </Route>
     </Route>
     <Route path={'todos'} element={<Todos/>}/>
     <Route path={'albums'} element={<Albums/>}/>
     <Route path={'/about'} element={<About/>}/>
   </Routes>


      </div>
  );
}

export default App;
