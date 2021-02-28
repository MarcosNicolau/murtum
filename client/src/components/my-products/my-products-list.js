import { Link } from 'react-router-dom';
import '../../styles/my-products.scss';

const ProductList = ({ products }) => {
    if(products === 'loading') return <h1>Loading...</h1>
    if(!products.length) return <h1>You dont have any products</h1>

    const checkAnswers = (product) => {
        const questions = product.questions;
        const unanswered = questions.filter(question => !question.answer);
        if(!unanswered.length) return;
        return <Link to={`/my-products/edit/${product.id}`} className='unanswered-questions'>You have {unanswered.length} questions to respond</Link>
    }

    return (
        <div className="products-container">
            {products.map(product => {
                return (
                    <div className="product" key={product.id}>
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