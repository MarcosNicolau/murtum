import { useState, useReducer } from 'react';
import productReducer, { productState, PRODUCT_ACTIONS } from './new-product-reducer';
import { useUserContext } from '../../user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import NewProductImgs from './new-product-image';
import Loader from '../loader';
import axios from 'axios';
import '../../styles/new-product.scss';

const NewProduct = () => {
    const user = useUserContext();
    if(!user) window.location.href = '/login';
    const [state, dispatch] = useReducer(productReducer, productState);
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleForm = async () => {
        const { name, description, price, category } = state;
        if(!name || !description || !price || !category || !images.length ) return setError('Complete all the fields');
        try{
            setIsSending(true);
            const res = await axios.post('/products/new-product', { name, images, description, price, category, id: user.id });
            setIsSending(false);
            window.location.href = res.data;
        }
        catch(err) {
            const error = err.response;
            if(error.status === '401') return window.location.href = error.data;
            if(error.status === '400') return setError(error.date)
        }
    }

    return (
        <div className="form-container">
            <h2>Sell your product!</h2>
            <form> 
                <input type="text" min="1" placeholder='Product name...' className='text-inputs' 
                    onChange={e => dispatch({type: PRODUCT_ACTIONS.SET_NAME, payload: e.target.value})}
                />
                <input type="number" placeholder='Product price...' className='text-inputs' 
                    onChange={e => dispatch({type: PRODUCT_ACTIONS.SET_PRICE, payload: e.target.value})}
                />
                <textarea className='description' placeholder='Product description...' 
                    onChange={e => dispatch({type: PRODUCT_ACTIONS.SET_DESCRIPTION, payload: e.target.value})}>
                </textarea>
                <div className='product-category'>
                    <label htmlFor="category">Product category:</label>
                    <div className="select-dropdown">
                        <select name="category" id='category' value='tech' onChange={e => dispatch({type: PRODUCT_ACTIONS.SET_CATEGORY, payload: e.target.value})}>
                            <option value="tech">Tech</option>
                            <option value="clothes">Clothes</option>
                            <option value="makeup">Makeup</option>
                            <option value="kids">Kids</option>
                        </select>
                    </div>
                </div>
                <NewProductImgs images={images} setImages={setImages} setError={setError} />
                {isSending ? <Loader relative={'true'}/> : <input type="button" className='submit-form-btn' value='SELL' onClick={handleForm}/>}
                {error && <p className='form-error'><FontAwesomeIcon icon={faExclamation}/> {error}</p>}
            </form>
        </div>
    );
}

export default NewProduct;