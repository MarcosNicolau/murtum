import { Link } from 'react-router-dom';
import cartIcon from '../assets/cart-icon.svg';
import searchIcon from '../assets/search-icon.svg';
import '../styles/nav.scss';

const Nav = () => {
    return (
        <nav>
            <a href="/" className='nav-logo'>murtum</a>
            <div className="search-bar-container">
                <input type="search" className='search-bar'/>
                <img src={searchIcon} alt=""/>
            </div>

            <div className="btns">
                <Link to="/sign-in" className="auth-btn sign-in-btn">sign-in</Link>
                <Link to="/login" className="auth-btn log-in-btn">login</Link>
                <img src={cartIcon} alt=""/>
            </div>
        </nav>
    );
}

export default Nav;