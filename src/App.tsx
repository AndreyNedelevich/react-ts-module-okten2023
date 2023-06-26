import {useState} from 'react';

import {PageEnum} from './constants/page.enum';
import {UserPage} from './pages/UserPage';
import {CommentPage} from './pages/CommentPage';
import {CarPage} from './pages/CarPage';
import {Header} from './components/Header/Header';

const App = () => {
    const [choice, setChoice] = useState<PageEnum>(PageEnum.USERS);
    //Состояние по которому будет отображать определенная страница а экране. По дефолту в нее передаем созданный в файле
    //pageEnum страницы где ключт это название страниц а значение числа(при необходимости их можно переопределять)
    // Переменная PageEnum имеют типизацию по дефолту.

    console.log(choice);
    return (
        <div>
            <Header setChoice={setChoice}/>
            {choice === PageEnum.USERS && <UserPage/>}
            {choice === PageEnum.COMMENTS && <CommentPage/>}
            {choice === PageEnum.CARS && <CarPage/>}
        {/*    Прописываем логику при которой та или другая страница должна показываться. В комопненте App в переменной choice
        при нажатии на кнопку page будет изменяться значения индекса. Далее если определенное  выражение **choice === PageEnum.USERS** даст true
        будет отображенна та или другая страница.*/}
        </div>
    );
};

export default App;
