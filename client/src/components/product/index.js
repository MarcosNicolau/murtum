import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Info from './info';
import Description from './description';
import Questions from './questions';

const Product = () => {
    const [product, setProduct] = useState('loading');
    const { id } = useParams();
    const getProduct = async () => {
        try {
            const res = await axios.get(`/products/${id}`);
            setProduct(res.data);
        }
        catch(err) {
            if(err.response.status === 404) return setProduct(err.response.data)
        }
    }
    useEffect(() => getProduct(), []);

    if(product === 'loading') return <h1>Loading...</h1>
    if(!product) return <h1>Product not found</h1>

    return (
        <div className="product-container">
            <Info images={product.images} name={product.name} price={product.price}/>
            <Description description={product.description} />
            <Questions productQuestions={product.questions} id={id}/>
        </div>
    );
}

export default Product;