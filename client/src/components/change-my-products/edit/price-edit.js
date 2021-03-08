import { useState } from 'react';
import { INFO_ACTIONS } from '../my-product-reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { useMyProductContext } from '../my-product-context';

const PriceEdit = ({ price, setProduct }) => {
    const [error, setError] = useState('');
    const { state, dispatch, makeChange } = useMyProductContext();

    return (
        <>
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
                        onClick={() => makeChange('price', state.price.priceInput, setError, setProduct )}
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
            {error && <p className='error'><FontAwesomeIcon icon={faExclamation}/> {error}</p>}
        </>
    );
}

export default PriceEdit;