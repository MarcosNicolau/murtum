import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../user-context';
import ProductsList from './my-products-list';
import Loader from '../loader';

const MyProducts = () => {
    const user = useUserContext();
    const [products, setProducts] = useState('loading');
    const [isInfiniteLoading, setIsInfiniteLoading] = useState('');
    
    useEffect(() => {
        if(user === 'loading') return;
        if(!user) return window.location.href = '/login';
        getUserProducts();
    }, [user]);
    
    useEffect(() => {
        window.addEventListener('scroll', infiniteLoading);
        return () => {
            window.removeEventListener('scroll', infiniteLoading);
        }
    })
    if(!user) window.location.href = '/login';
    
    const infiniteLoading = e => {
        if(isInfiniteLoading === 'loaded') return;
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setIsInfiniteLoading('loading');
            getUserProducts();
        } 
    }
    
    const getUserProducts = async () => {
        try{
            if(isInfiniteLoading === 'loading') return;
            const res = await axios.post('/my-products', { id: user.id, length: products === 'loading' ? 0 : products.length });
            setProducts(res.data.products); 
            setIsInfiniteLoading(res.data.hasLoaded);
        }
        catch(err){
            if(err.response.status === 401) return window.location.href === '/';       
        }
    } 

    if(products === 'loading') return <Loader />
    if(!products.length) return <h1 className='any-products-msg'>You dont have any products</h1>

    return (
        <>
            <ProductsList products={products} getUserProducts={getUserProducts} user={user} setProducts={setProducts}/>
            {isInfiniteLoading === 'loading' && <Loader relative={"true"} style={{left: '50%', transform: 'translateX(-50%)'}}/>}
       </>
    );
}

export default MyProducts;