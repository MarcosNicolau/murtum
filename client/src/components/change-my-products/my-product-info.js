import { useReducer, useEffect } from 'react';
import axios from 'axios';
import infoReducer, { INFO_ACTIONS, infoState } from './my-product-reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import ImagesInfo from './images-info';
import '../../styles/product/info.scss';
import '../../styles/product/product-responsive.scss';
import '../../styles/my-products/change-my-product.scss';

const MyProductInfo = ({ images, name, price, productId, setProduct }) => {
    const [state, dispatch] = useReducer(infoReducer, infoState);
    useEffect(() => {
        dispatch({ type: INFO_ACTIONS.SET_IMAGES, payload: images });
        dispatch({ type: INFO_ACTIONS.SET_UPDATED_IMAGES, payload: images });
        dispatch({ type: INFO_ACTIONS.SET_ACTIVE_IMG, payload: images[0] });
        dispatch({ type: INFO_ACTIONS.SET_NAME_INPUT, payload: name });
        dispatch({ type: INFO_ACTIONS.SET_PRICE_INPUT, payload: price });
    }, []);
    
    const makeChange = async (field, body, action) => {
        if(!body || !body.length) return;
        try {
            setProduct('loading');
            const res = await axios.post(`/my-products/edit/${field}`, { [field]: body, productId });
            setProduct(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="product-info">
            <ImagesInfo state={state} dispatch={dispatch} makeChange={makeChange} setProduct={setProduct}/>
            <div className='product-name-price-actions-container'>
                <div>
                    {state.name.editName ? 
                        <div className='edit-container'>
                            <button className='edit-icon' onClick={() => dispatch({ type: INFO_ACTIONS.SET_EDIT_NAME })}>
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </button>
                            <textarea cols='30' type="text" value={state.name.nameInput} 
                                className='edit-input'
                                onChange={e => dispatch({ type: INFO_ACTIONS.SET_NAME_INPUT, payload: e.target.value })}
                            ></textarea>
                            <input type="button" value="Change" className='submit-change-btn' 
                                onClick={() => makeChange('name', state.name.nameInput, INFO_ACTIONS.SET_EDIT_NAME )}
                            />
                        </div>
                        :
                        <h3 className="name">
                            {name} 
                            <button className='edit-icon' onClick={() => dispatch({ type: INFO_ACTIONS.SET_EDIT_NAME })}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                        </h3>
                    }
                    {state.price.editPrice ? 
                        <div className='edit-container'>
                            <button className='edit-icon' onClick={() => dispatch({ type: INFO_ACTIONS.SET_EDIT_PRICE })}>
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </button>
                            <input type="number" value={state.price.priceInput} 
                                className='edit-input'
                                onChange={e => dispatch({ type: INFO_ACTIONS.SET_PRICE_INPUT, payload: e.target.value })}
                            />
                            <input type="button" value="Change" className='submit-change-btn'
                                onClick={() => makeChange('price', state.price.priceInput, INFO_ACTIONS.SET_EDIT_PRICE )}
                            />
                        </div>
                        :
                        <h3 className="price">
                            {price} 
                            <button className='edit-icon' onClick={() => dispatch({ type: INFO_ACTIONS.SET_EDIT_PRICE })}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                        </h3>
                    }
                </div>
            </div>
        </div>
    );
}

export default MyProductInfo;