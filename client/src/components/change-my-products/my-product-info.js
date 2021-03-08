import { useEffect } from 'react';
import { useMyProductContext } from './my-product-context';
import { INFO_ACTIONS } from './my-product-reducer';
import NameEdit from './edit/name-edit';
import PriceEdit from './edit/price-edit';
import ImagesInfo from './edit/images-info/';
import '../../styles/product/info.scss';
import '../../styles/product/product-responsive.scss';
import '../../styles/my-products/change-my-product.scss';

const MyProductInfo = ({ images, name, price, setProduct }) => {
    const { dispatch } = useMyProductContext();

    useEffect(() => {
        dispatch({ type: INFO_ACTIONS.SET_UPDATED_IMAGES, payload: images });
        dispatch({ type: INFO_ACTIONS.SET_ACTIVE_IMG, payload: images[0] });
        dispatch({ type: INFO_ACTIONS.SET_NAME_INPUT, payload: name });
        dispatch({ type: INFO_ACTIONS.SET_PRICE_INPUT, payload: price });
    }, []);
    
    return (
        <div className="product-info">
            <ImagesInfo images={images} setProduct={setProduct}/>
            <div className='product-name-price-actions-container'>
                <div>
                    <NameEdit name={name} setProduct={setProduct}/>
                    <PriceEdit price={price} setProduct={setProduct}/>
                </div>
            </div>
        </div>
    );
}

export default MyProductInfo;