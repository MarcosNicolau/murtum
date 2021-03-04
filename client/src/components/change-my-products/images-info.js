import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { INFO_ACTIONS } from './my-product-reducer'; 
import { useState } from 'react';

const ImagesInfo = ({ state, dispatch, makeChange, setProduct }) => {
    const [error, setError] = useState('');
    const previewImages = e => {
        if(Object.values(e.target.files).length >= (5 - ( state.images.length - 1))) return setError('5 images MAX');
        if(state.images.length >= 5) return setError('You can only upload up to 5 images');
        setError('');
            Object.values(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = () => dispatch({ type: INFO_ACTIONS.SET_UPDATED_IMAGES, payload:  [reader.result]});
            reader.readAsDataURL(file);
        });     
    }

    return (
        <>
        <div className="imgs-selector" style={{width: state.editImage ? '50%' : ''}} >
                <button className='edit-icon' onClick={() => dispatch({ type: INFO_ACTIONS.SET_EDIT_IMG })}>
                    <FontAwesomeIcon icon={faEdit}/>
                </button>
                {state.editImage && <button className='submit-change-btn update-images-btn' onClick={() => makeChange('images', state.updatedImages, INFO_ACTIONS.SET_EDIT_IMG)}>Update imgs</button>}
                {state.editImage ? 
                    state.updatedImages.map((img, index) => {
                        return (
                            <div className="img-container" key={index}>
                                <img src={img} alt='uploaded-img' 
                                    onMouseOver={e => dispatch({ type: INFO_ACTIONS.SET_ACTIVE_IMG, payload: e.target.src})} 
                                    style={{height: '5em'}}
                                />
                                <button 
                                    className='delete-img-btn'
                                    onClick={e => dispatch({type: INFO_ACTIONS.DELETE_IMAGE, payload: e})}>
                                    <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faTimesCircle} />
                                </button>
                            </div>
                        );
                    })
                    :
                    state.images.map((img, index) => {
                        return (
                            <div className="img-container" key={index}>
                                <img src={img} alt='uploaded-img' 
                                    onMouseOver={e => dispatch({ type: INFO_ACTIONS.SET_ACTIVE_IMG, payload: e.target.src})} 
                                />
                            </div>
                        );
                    })            
                }
                {state.editImage &&
                <>
                    <div>
                        <div className='update-imgs'>
                            <input type="file" id='file' multiple accept="image/*" className='img-file-input' onChange={previewImages}/>
                            <label for="file"><FontAwesomeIcon icon={faPlus} className='update-imgs-icon'/></label>
                        </div>
                    </div>
                    {error && <p>{error}</p>}
                </>
                }
            </div>

            {state.editImage ||
                <div className="active-img-container">
                    <img src={state.activeImg} alt="product" className="active-image"/>
                </div>
            }
        </>
    );
}

export default ImagesInfo;