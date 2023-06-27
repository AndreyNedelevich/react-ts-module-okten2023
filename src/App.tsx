import {Comments} from './components/Comments/Comments';
import './App.css'
import {Users} from "./components/Users/Users";

const App = () => {
    return (
        <div className='container'>
            <Comments/>
            <Users/>
        </div>
    );
};

export default App;
