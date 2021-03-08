import { useState } from 'react';
import { INFO_ACTIONS } from '../my-product-reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { useMyProductContext } from '../my-product-context';

const NameEdit = ({ name, setProduct }) => {
    const [error, setError] = useState('');
    const { dispatch, makeChange, state } = useMyProductContext();
    
    return (
        <>
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
                        onClick={() => makeChange('name', state.name.nameInput, setError, setProduct)}
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
            {error && <p className='error'><FontAwesomeIcon icon={faExclamation}/> {error}</p>}
        </>
    );
}

export default NameEdit;