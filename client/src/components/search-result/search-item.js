import { useEffect, useState } from "react";
import axios from 'axios';
import ProductsList from "../product-list";

const SearchItem = ({ search }) => {
    const [products, setProducts] = useState(false);

    const getItems = async () => {
        try{
            const res = await axios.get(`/products?search=${search}`);
            setProducts(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => getItems(), []);

    if(!products) return <h1>Loading...</h1>
    if(!products.length) return <h1 className='negative-search'>No products were found</h1>
    
    return (
        <ProductsList products={products}/>
    );
}

export default SearchItem;