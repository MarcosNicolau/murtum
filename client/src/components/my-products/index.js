import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../user-context';
import ProductsList from './my-products-list';

const MyProducts = () => {
    const user = useUserContext();
    const [products, setProducts] = useState('loading')
    if(!user) window.location.href = '/login';
    
    const getUserProducts = async () => {
        try{
            const res = await axios.post('/user/my-products', { id: user.id });
            setProducts(res.data); 
        }
        catch(err){
            console.log(err.response);
        }
    } 
    getUserProducts();

    return (
       <ProductsList products={products} />
    );
}

export default MyProducts;