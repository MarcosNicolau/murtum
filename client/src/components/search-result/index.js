import { useState, useEffect } from 'react';
import useQuery from '../../utils/use-query';
import ProductsList from '../product-list';
import Pages from './pages';
import axios from 'axios';
import Loader from '../loader';
import '../../styles/products-list.scss';

const SearchResult = () => {
    const search = useQuery().get('search');
    const length = useQuery().get('length');
    const [products, setProducts] = useState(undefined);
    const [productsPages, setProductPages] = useState([]);

    const getItems = async () => {
        try {
            const res = await axios.get(
                `/products?search=${search}&length=${length}`
            );
            setProducts(res.data.products);
            setProductPages(res.data.pages);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => getItems(), []);

    if (!products) return <Loader />;
    if (!products.length)
        return <h1 className="negative-search">No products were found</h1>;

    return (
        <>
            <h2 className="query">{search}</h2>
            <ProductsList products={products} />
            <Pages pages={productsPages} length={length} search={search} />
        </>
    );
};

export default SearchResult;
