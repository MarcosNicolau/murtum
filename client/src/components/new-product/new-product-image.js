import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

const NewProductImgs = ({ images, setImages, setError }) => {

    const deleteImg = e => {
        e.preventDefault();
        const imgToDelete = e.target.previousSibling.src;
        const filterImg = images.filter(img => img !== imgToDelete );
        setImages(filterImg);
    }

    const previewImages = e => {
        if(Object.values(e.target.files).length >= (5 - ( images.length - 1))) return setError('You can only upload up to 5 images');
        if(images.length >= 5) return setError('You can only upload up to 5 images');
        setError('');
            Object.values(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = () => setImages(prev => [...prev, reader.result]);
            reader.readAsDataURL(file);
        });
    }

    return (
        <>
        <div className="button-wrapper">
            <span className="label">
                Upload File
            </span>
            <input type="file" accept="image/*" multiple onChange={e => previewImages(e)} className="upload-box"/>
        </div>
        <div className="images-preview">
            {images.map((img, index) => {
                return (
                    <div className="img" key={index}>
                        <img src={img} alt='uploaded-img'/>
                        <button onClick={e => deleteImg(e)}><FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faTimesCircle} /></button>
                    </div>
                );
            })}
        </div>
    </>
    );
}

export default NewProductImgs;