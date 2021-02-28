import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../user-context';
import Info from '../product/info';
import Description from '../product/description';
import MyProductQuestons from './my-product-questions';
import getProduct from '../../utils/get-single-product';
import axios from 'axios';

const ChangeMyProducts = () => {
    const user = useUserContext();
    const { id } = useParams();
    const [product, setProduct] = useState('loading');

    useEffect(() => getProduct(axios.post(`/user/my-products/edit`, {id: user.id, productId: id}), setProduct), []);

    if(product === 'loading') return <h1>Loading...</h1>
    if(!product) return <h1>Product not found</h1>

    return (
        <div className='product-container'>
            <Info images={product.images} name={product.name} price={product.price}/>
            <Description description={product.description} />
            <MyProductQuestons productQuestions={product.questions} productId={id}/>
        </div>
    );
}

export default ChangeMyProducts;