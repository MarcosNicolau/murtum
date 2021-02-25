import { useUserContext } from '../../user-context';
import axios from 'axios';
import { useEffect } from 'react';

const Cart = () => {
    const user = useUserContext();
    useEffect(() => getCart(), []);
    if(!user) return window.location.href = '/login';
    const getCart = async () => {
        try{
            const res = await axios.post(`/payment/cart/${user.id}`);
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <h1>YOUR CART</h1>
    );
}

export default Cart;