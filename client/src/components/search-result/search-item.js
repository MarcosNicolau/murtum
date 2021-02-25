import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchItem = ({ search }) => {
    const [items, setItems] = useState(false);

    const getItems = async () => {
        try{
            const res = await axios.get(`/products?search=${search}`);
            console.log(res);
            setItems(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => getItems(), []);

    if(!items) return <h1>Loading...</h1>
    if(!items.length) return <h1>No products were found</h1>
    
    return (
        <div className="search-result-container">
            {items.map(item => {
                return (
                    <div className="search" key={item.id}>
                        <div className='img-container'>
                            <img src={item.images[0]} alt=""/>
                        </div>
                        <div>
                            <Link to={`/products/${item.id}`} className='item-name'>{item.name}</Link>
                            <h2 className='item-price'>${item.price}</h2>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default SearchItem;