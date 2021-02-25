import {
    BrowserRouter as Router,
    Switch,
    Route,
    
} from "react-router-dom";
import Nav from './components/nav';
import Home from './components/home/index';
import SignIn from './components/auth/sign-in';
import LogIn from './components/auth/log-in';
import NewProduct from './components/new-product/index';
import SearchResult from './components/search-result';
import Product from './components/product/';
import Cart from './components/cart';
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
                    <Route path='/products/:id' component={Product} />
                    <Route path='/products' component={SearchResult}/>
                    <Route path='/cart' component={Cart} />
                </Switch>
            </UserContextProvider>
        </Router>
    );
};

export default App;
