import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../user-context';
import MyProductContextProvider from './my-product-context';
import MyProductInfo from './my-product-info';
import Description from './edit/description-edit';
import MyProductQuestons from './my-product-questions';
import getProduct from '../../utils/get-single-product';
import Loader from '../loader';
import axios from 'axios';

const ChangeMyProducts = () => {
    const user = useUserContext();
    const { id } = useParams();
    const [product, setProduct] = useState('loading');

    useEffect(() => {
        if(user === 'loading') return;
        if(!user) return window.location.href = '/login';
        getProduct(axios.post(`/my-products/edit`, {id: user.id, productId: id}), setProduct);
    }, [user]);

    
    if(product === 'loading') return <Loader />
    if(!product) return <h1>Product not found</h1>

    return (
        <MyProductContextProvider>
            <div className='product-container'>
                <MyProductInfo images={product.images} name={product.name} price={product.price} setProduct={setProduct}/>
                <Description description={product.description} setProduct={setProduct}/>
                <MyProductQuestons productQuestions={product.questions} productId={id}/>
            </div>
        </MyProductContextProvider>
    );
}

export default ChangeMyProducts;