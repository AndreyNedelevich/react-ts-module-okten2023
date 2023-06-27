import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {unstable_HistoryRouter as BrowserRouter} from 'react-router-dom';
//Импортируем unstable_HistoryRouter и при помощи as переименовуем

import App from './App';
import {setupStore} from './redux';
import {history} from "./services";
//Импортируем функцию history в index ts для того что бы  добавить его в BrowserRouter. Что бы он реагировал на изменение
// в адресной строке. Но такой возможности нет в BrowserRouter. Но она имееться в методе unstable_HistoryRouter из react-router-dom
//Далее history (в нем лежит история браузера) просто передаем переименованному unstable_HistoryRouter



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const store = setupStore();




root.render(
    <Provider store={store}>
        {/*@ts-expect-error*/}
        <BrowserRouter history={history}>
            <App/>
        </BrowserRouter>
    </Provider>
);

