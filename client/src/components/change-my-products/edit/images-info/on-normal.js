import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { INFO_ACTIONS } from '../../my-product-reducer'; 
import { useMyProductContext } from '../../my-product-context';

const ImagesOnNormal = ({ images }) => {
    const { dispatch, state } = useMyProductContext();

    return (
        <>
            <div className="imgs-selector">
                    <button className='edit-icon' onClick={() => dispatch({ type: INFO_ACTIONS.SET_EDIT_IMG })}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </button>
                    {images.map((img, index) => {
                            return (
                                <div className="img-container" key={index}>
                                    <img src={img} alt='uploaded-img' 
                                        onMouseOver={e => dispatch({ type: INFO_ACTIONS.SET_ACTIVE_IMG, payload: e.target.src})} 
                                    />
                                </div>
                            );
                        })            
                    }
            </div>
            <div className="active-img-container">
                <img src={state.activeImg} alt="product" className="active-image"/>
            </div>
        </>
    );
}

export default ImagesOnNormal;