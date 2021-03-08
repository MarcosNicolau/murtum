import { INFO_ACTIONS } from '../my-product-reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { useMyProductContext } from '../my-product-context';
import { useState, useEffect } from 'react';

const DescriptionEdit = ({ description, setProduct }) => {
    const { state, dispatch, makeChange } = useMyProductContext();
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch({ type: INFO_ACTIONS.SET_DESCRIPTION_INPUT, payload: description });
    }, []);

    return (
        <>
            {state.description.editDescription ? 
                <div className='edit-container'>
                    <button className='edit-icon' onClick={() => dispatch({ type: INFO_ACTIONS.SET_EDIT_DESCRIPTION })}>
                        <FontAwesomeIcon icon={faTimesCircle}/>
                    </button>
                    <textarea cols='150' rows="20" type="text" value={state.description.descriptionInput} 
                        className='edit-input'
                        onChange={e => dispatch({ type: INFO_ACTIONS.SET_DESCRIPTION_INPUT, payload: e.target.value })}
                    ></textarea>
                    <input type="button" value="Change" className='submit-change-btn' 
                        onClick={() => makeChange('description', state.description.descriptionInput, setError, setProduct)}
                    />
                </div>
                :
                <div className="description-container">
                    <h2>Description</h2>
                    <p className="description">{description}</p>
                    <button className='edit-icon' onClick={() => dispatch({ type: INFO_ACTIONS.SET_EDIT_DESCRIPTION })}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </button>
                </div>
            }
            {error && <p className='error'><FontAwesomeIcon icon={faExclamation}/> {error}</p>}
        </>
    );
}

export default DescriptionEdit;