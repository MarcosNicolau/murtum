import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import '../../styles/my-products.scss';

const ProductList = ({ products, getUserProducts, user, setProducts }) => {
    const checkAnswers = (product) => {
        const questions = product.questions;
        const unanswered = questions.filter(question => !question.answer);
        if(!unanswered.length) return;
        return <Link to={`/my-products/edit/${product.id}`} className='unanswered-questions'>You have {unanswered.length} questions to respond</Link>
    }

    const deleteProduct = async (product) => {
        setProducts('loading');
        await axios.post('/my-products/delete-product', { productId: product.id, id: user.id });
        getUserProducts();
    }

    return (
        <div className="products-container">
            {products.map(product => {
                return (
                    <div className="product" key={product.id}>
                        <button className='delete-product-btn' onClick={() => deleteProduct(product)}>
                            <FontAwesomeIcon icon={faTimesCircle} style={{pointerEvents: 'none'}}/>
                        </button>
                        <Link to={`/my-products/edit/${product.id}`} className='name'>{product.name}</Link>
                        <img src={product.image} alt="product"/>
                        <h2>${product.price}</h2>
                        {checkAnswers(product)}
                    </div>
                );
            })}
        </div>
    );
}

export default ProductList;