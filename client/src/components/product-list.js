import { Link } from 'react-router-dom';
import '../styles/products-list.scss';

const ProductsList = ({ products }) => {
    return (
        <div className="list-container">
            {products.map((product) => {
                return (
                    <div className="result" key={product.id}>
                        <div className="img-container">
                            <img src={product.image} alt="product" />
                        </div>
                        <div>
                            <Link
                                to={`/products/${product.id}`}
                                className="product-name"
                            >
                                {product.name}
                            </Link>
                            <h2 className="product-price">${product.price}</h2>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductsList;
