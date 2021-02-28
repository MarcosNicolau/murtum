import { useEffect, useState } from 'react';
import CartProductsList from './cart-products-list';

const CartItems = ({ products, id, getCart }) => {
    const [totalPrice, setTotalPrice] = useState('');
    const getTotalPrice = () => {
        const parseNumber = products.map(product => Number(product.price));
        const price = parseNumber.reduce((a, b) => a + b);
        setTotalPrice(price);
    }
    useEffect(() => getTotalPrice(), [products])
    return (
        <>
            <h2 className="query">Your Cart</h2>
            <div className="cart-container">
                <CartProductsList products={products} id={id} getCart={getCart} />
                <div className="buy-products-container">
                    <h2 className="total-price">Total amount: ${totalPrice}</h2>
                    <button className="buy-cart">Buy</button>
                </div>
            </div>
        </>
    );
}

export default CartItems;