import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../user-context';
import getProduct from '../../utils/get-single-product';
import Info from './info';
import BuyBtns from './buy-btns';
import Description from './description';
import Questions from './questions';
import Loader from '../loader';
import axios from 'axios';

const Product = () => {
    const user = useUserContext();
    const { id } = useParams();
    const [product, setProduct] = useState('loading');
    const [isOwn, setIsOwn] = useState(undefined);

    useEffect(() => getProduct(axios.get(`/products/${id}`), setProduct), []);
    useEffect(() => {
        if(product.owner === user.id) return setIsOwn(true);
        setIsOwn(false);
    }, [product])

    if(product === 'loading') return <Loader />;
    if(!product) return <h1>Product not found</h1>;

    return (
        <div className="product-container">
            <Info images={product.images} name={product.name} price={product.price} user={user} productId={id}>
                <BuyBtns productId={id} user={user} isOwn={isOwn}/>
            </Info>
            <Description description={product.description} />
            <Questions productQuestions={product.questions} productId={id} user={user} isOwn={isOwn}/>
        </div>
    );
}

export default Product;