import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import '../../styles/products-list.scss';
import '../../styles/cart.scss';
import axios from 'axios';

const CartProductsList = ({ products, id, getCart }) => {

    const deleteProduct = async (productId) => { 
        const res = await axios.post('/user/cart/delete-cart', { id, productId });
        getCart();
    }

    return (
        <div className="list-container" id={'cart-list-container'}>
            {products.map(product => {
                return(
                <div className="result" id={'cart-result'} key={product.id}>
                    <button className="delete-product" onClick={() => deleteProduct(product.id)}><FontAwesomeIcon icon={faTimesCircle} style={{pointerEvents: 'none'}} /></button>
                    <div className='img-container'>
                        <img src={product.image} alt="product"/>
                    </div>
                    <div className="cart-product-info">
                        <Link to={`/products/${product.id}`} className='product-name cart-name'>{product.name}</Link>
                        <h2 className='product-price cart-price'>${product.price}</h2>
                    </div>
                </div>
                );
            })}
        </div>
    );
}

export default CartProductsList;