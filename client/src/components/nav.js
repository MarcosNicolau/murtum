import { useUserContext } from '../user-context';
import { Link } from 'react-router-dom';
import UserContext from '../user-context';
import cartIcon from '../assets/cart-icon.svg';
import searchIcon from '../assets/search-icon.svg';
import '../styles/nav.scss';

const Nav = () => {
    const user = useUserContext(UserContext);
    
    return (
        <nav>
            <a href="/" className='nav-logo'>murtum</a>
            <div className="search-bar-container">
                <input type="search" className='search-bar'/>
                <img src={searchIcon} alt=""/>
            </div>
            {
                user ? 
                <div className='btns'>
                    <Link to={`/user/${user.id}`}>{user.username}</Link>
                    <img src={cartIcon} alt="cart-icon"/>
                </div>
                :
                <div className="btns">
                    <Link to="/sign-in" className="auth-btn sign-in-btn">sign-in</Link>
                    <Link to="/login" className="auth-btn log-in-btn">login</Link>
                    <img src={cartIcon} alt="cart-icon"/>
                </div>
            }
        </nav>
    );
}

export default Nav;