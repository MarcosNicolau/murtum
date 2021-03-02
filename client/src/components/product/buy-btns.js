import { useEffect, useState } from 'react';
import Loader from '../loader';
import axios from 'axios';

const BuyBtns = ({ user, productId, isOwn }) => {
    const [isProductInCart, setIsProductInCart] = useState('loading');
    const addToCart = async () => {
        if(!user) return window.location.href = '/login';
        try{
            setIsProductInCart('loading');
            const res = await axios.post('/cart/add-cart', { id: user.id, productId });
            setIsProductInCart(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    const checkIfProductIsAdded = async () => {
        const res = await axios.post('/cart/is-item-in-cart', { id: user.id, productId });
        setIsProductInCart(res.data);
    }

    useEffect(() => {
        if(user) return checkIfProductIsAdded();
        setIsProductInCart(false);
    }, []);
    
    if(isOwn) return null;
    if(isProductInCart === 'loading') return <Loader relative={'true'}/>;
    return (
        <div className="action-btns">
            <button className='buy-now-btn'>Buy now</button>
            <button 
                className={`add-to-cart-btn ${isProductInCart ? 'in-cart' : 'add-to-cart'}`} 
                onClick={addToCart}>{isProductInCart ? 'In cart' : 'Add to cart'}
            </button>

        </div>   
    );
}

export default BuyBtns;