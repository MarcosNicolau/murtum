import { useUserContext } from '../../user-context';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../loader';
import CartItems from './cart-items';

const Cart = () => {
    const user = useUserContext();
    const [cart, setCart] = useState('loading');
    
    const getCart = async () => {
        try{
            setCart('loading')
            const res = await axios.post(`/cart`, { id: user.id });
            setCart(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(() => getCart(), [user]);
    
    if(user === 'loading') return <Loader />
    if(!user) return window.location.href = '/login';
    
    if(cart === 'loading') return <Loader />
    if(!cart.length) return <h1 className='cart-empty'>Your cart is empty</h1> 

    return (
        <CartItems products={cart} id={user.id} getCart={getCart} setCart={setCart}/>
    );
}

export default Cart;