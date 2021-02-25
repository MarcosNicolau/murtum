import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import arrowIcon from '../assets/arrow-icon.svg';
import cartIcon from '../assets/cart-icon.svg';
import searchIcon from '../assets/search-icon.svg';
import '../styles/nav.scss';

const Nav = () => {
    const user = useUserContext();
    const [search, setSearch] = useState('');
    
    return (
        <nav>
            <a href="/" className='nav-logo'>murtum</a>
            <div className="search-bar-container">
                <input type="search" className='search-bar' onChange={(e) => setSearch(e.target.value)}/>
                <Link onClick={() => window.location.href = `/products?search=${search}`}><img src={searchIcon} alt="search-icon"/></Link>
            </div>
            {
                user ? 
                <div className='nav-actions nav-user-active'>
                    <div className='user-selector'>
                        <div className="user-info">
                            <FontAwesomeIcon icon={faUser}/>
                            <p className='username'>{user.username}</p>
                           <img src={arrowIcon} alt="arrrow-dropdown" className='user-arrow'/>
                        </div>

                        <div className="user-dropdown-menu">
                            <Link to='/new-product'>Sell your product</Link>
                            <Link to={`/products/${user.id}`}>Your products</Link>
                            <button>Log out</button>
                        </div>
                    </div>
                    <Link to='/cart'><img src={cartIcon} alt="cart-icon"/></Link>                  
                </div>
                :
                <div className="nav-actions">
                    <Link to="/sign-in" className="auth-btn sign-in-btn">sign-in</Link>
                    <Link to="/login" className="auth-btn log-in-btn">login</Link>
                    <Link to='/cart' ><img src={cartIcon} alt="cart-icon"/></Link>                  
                </div>
            }
        </nav>
    );
}

export default Nav;