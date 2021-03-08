import { useUserContext } from '../user-context';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import cartIcon from '../assets/cart-icon.svg';
import arrowIcon from '../assets/arrow-icon.svg';
import searchIcon from '../assets/search-icon.svg';
import '../styles/nav.scss';
import axios from 'axios';

const Nav = () => {
    const user = useUserContext();
    const [search, setSearch] = useState('');
    const [screenWidth, setScreenWidth] = useState(undefined);

    const handleLogOut = async () => {
        const res = await axios.post('/auth/logout');
        window.location.href = res.data;
    };
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    if (user === 'loading') return null;

    return (
        <nav>
            <a href="/" className="nav-logo">
                {screenWidth <= 890 ? 'm' : 'murtum'}
            </a>
            <div className="search-bar-container">
                <input
                    type="search"
                    className="search-bar"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="search-icon"
                    onClick={() =>
                        (window.location.href = `/products?search=${search}`)
                    }
                />
            </div>
            {user ? (
                <div className="nav-actions nav-user-active">
                    <div className="user-selector">
                        <div className="user-info">
                            <FontAwesomeIcon icon={faUser} />
                            <p className="username">{user.username}</p>
                            <img
                                src={arrowIcon}
                                alt="arrrow-dropdown"
                                className="user-arrow"
                            />
                        </div>

                        <div className="user-dropdown-menu">
                            <Link to="/new-product">Sell your product</Link>
                            <Link to={`/my-products`}>Your products</Link>
                            <button onClick={handleLogOut}>Log out</button>
                        </div>
                    </div>
                    <Link to="/cart">
                        <img src={cartIcon} alt="cart-icon" />
                    </Link>
                </div>
            ) : (
                <div className="nav-actions">
                    <Link to="/sign-in" className="auth-btn sign-in-btn">
                        sign-in
                    </Link>
                    <Link to="/login" className="auth-btn log-in-btn">
                        login
                    </Link>
                    <Link to="/cart">
                        <img src={cartIcon} alt="cart-icon" />
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Nav;
