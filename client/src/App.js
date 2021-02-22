import {
    BrowserRouter as Router,
    Switch,
    Route,
    
} from "react-router-dom";
import Nav from './components/nav';
import SignIn from './components/sign-in';
import LogIn from './components/log-in';
import './styles/index.scss';

const App = () => {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path='/sign-in' component={SignIn}/>
                <Route path='/login' component={LogIn}/>
            </Switch>
        </Router>
    );
};

export default App;
