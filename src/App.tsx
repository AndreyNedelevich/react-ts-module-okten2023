import {Navigate, Route, Routes} from 'react-router-dom';

import {MainLayout} from './layouts';
import {CarPage} from './pages';

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'cars'}/>}/>
                <Route path={'cars'} element={<CarPage/>}/>
            </Route>
        {/*    Сдесь в маршрутизации мы указываем что У нас будет одна страница MainLayout в самом компоненте будет
         компонент    <Outlet/>   в котором юудут отображаться дочерние Route (MainLayout) По деффолту навигация будет происходить
         на компоненту 'cars'
         */}
        </Routes>
    );
};

export default App;
