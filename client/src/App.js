import {
    BrowserRouter as Router,
    Switch,
    Route,
    
} from "react-router-dom";
import Nav from './components/nav';
import Home from './components/home/index';
import SignIn from './components/sign-in';
import LogIn from './components/log-in';
import NewProduct from './components/new-product/index';
import SearchResult from './components/search-result';
import { UserContextProvider } from './user-context';
import './styles/index.scss';

const App = () => {
    return (
        <Router>
            <UserContextProvider>
                <Nav />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/sign-in' component={SignIn}/>
                    <Route path='/login' component={LogIn}/>
                    <Route path='/new-product' component={NewProduct}/>
                    <Route path='/products' component={SearchResult}/>
                </Switch>
            </UserContextProvider>
        </Router>
    );
};

export default App;
