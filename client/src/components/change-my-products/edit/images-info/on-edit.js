import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { INFO_ACTIONS } from '../../my-product-reducer'; 
import { useState } from 'react';
import { useMyProductContext } from '../../my-product-context';

const ImagesOnEdit = ({ setProduct }) => {
    const [error, setError] = useState('');
    const { dispatch, makeChange, state } = useMyProductContext();

    const previewImages = e => {
        if(Object.values(e.target.files).length >= (5 - ( state.updatedImages.length - 1))) return setError('5 images MAX');
        if(state.updatedImages.length >= 5) return setError('You can only upload up to 5 images');
        setError('');
            Object.values(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = () => dispatch({ type: INFO_ACTIONS.SET_UPDATED_IMAGES, payload:  [reader.result]});
            reader.readAsDataURL(file);
        });     
    }

    return (
        <div className="imgs-selector" style={{width: '50%'}} >
            <button className='edit-icon' onClick={() => dispatch({ type: INFO_ACTIONS.SET_EDIT_IMG })}>
                <FontAwesomeIcon icon={faEdit}/>
            </button>
            <button className='submit-change-btn update-images-btn' 
                    onClick={() => makeChange('images', state.updatedImages, setError, setProduct)}>
                    Update imgs
            </button>

            {state.updatedImages.map((img, index) => {
                    return (
                        <div className="img-container" key={index}>
                            <img src={img} alt='uploaded-img' style={{height: '5em', cursor: 'default'}}/>
                            <button 
                                className='delete-img-btn'
                                onClick={e => dispatch({type: INFO_ACTIONS.DELETE_IMAGE, payload: e})}>
                                <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faTimesCircle} />
                            </button>
                        </div>
                    );
                })}
            <div>
                <div className='update-imgs'>
                    <input type="file" id='file' multiple accept="image/*" className='img-file-input' onChange={previewImages}/>
                    <label htmlFor="file"><FontAwesomeIcon icon={faPlus} className='update-imgs-icon'/></label>
                </div>
            </div>
            {error && <p className='error'><FontAwesomeIcon icon={faExclamation}/> {error}</p>}
        </div>
    );
}

export default ImagesOnEdit;