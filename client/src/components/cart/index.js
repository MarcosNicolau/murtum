import { useUserContext } from '../../user-context';
import axios from 'axios';
import { useState } from 'react';
import CartItems from './cart-items';

const Cart = () => {
    const user = useUserContext();
    const [cart, setCart] = useState('loading');
    if(user === 'loading') return <h1>Loading...</h1>
    if(!user) return window.location.href = '/login';
    
    const getCart = async () => {
        try{
            const res = await axios.post(`/user/cart`, { id: user.id });
            setCart(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    getCart();
    if(cart === 'loading') return <h1>Loading...</h1>
    if(!cart.length) return <h1>Your cart is empty</h1> 

    return (
        <CartItems products={cart} id={user.id} getCart={getCart}/>
    );
}

export default Cart;