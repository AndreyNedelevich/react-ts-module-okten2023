import {Navigate, Route, Routes} from 'react-router-dom';

import {MainLayout} from './layouts';
import {CarPage, LoginPage, RegisterPage} from './pages';
import {RequiredAuth} from "./hoc";

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'login'}/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'register'} element={<RegisterPage/>}/>
                {/*При роуте на cars делаем проверку в комопненте RequiredAuth если внутри проверка дает что пользователь
                авторизован то попадаем на cars если нет то происходит перенос в комопнент Login*/}
                <Route path={'cars'} element={
                    <RequiredAuth>
                        <CarPage/>
                    </RequiredAuth>
                }/>
            </Route>
        </Routes>
    );
};

export default App;
