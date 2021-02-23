import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { useUserContext } from '../user-context';
import axios from 'axios';
import '../styles/new-product.scss';

const NewProduct = () => {
    const user = useUserContext();
    if(user === false) window.location.href = 'login';
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('tech');
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    const handleForm = async () => {
        if(!name || !description || !price || !category || !images.length ) return setError('Complete all the fields');
        try{
            const res = await axios.post('/products/new-product', { name, images, description, price, category, id: user.id });
            window.location.href = res.data;
        }
        catch(err) {
            if(err.reponse.status === '401') return window.location.href = err.response.data;
        }
    }

    const previewImages = e => {
        if(Object.values(e.target.files).length >= (5 - ( images.length - 1))) return setError('You can only upload up to 5 images');
        if(images.length >= 5) return setError('You can only upload up to 5 images');
        setError('');
            Object.values(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = img => setImages(prev => [...prev, img.target.result]);
            reader.readAsDataURL(file);
        });
    }

    const deleteImg = e => {
        e.preventDefault();
        const imgToDelete = e.target.previousSibling.src;
        const filterImg = images.filter(img => img !== imgToDelete );
        setImages(filterImg);
    }

    return (
        <div className="form-container">
            <h2>Sell your product!</h2>
            <form> 
                <input type="text" min="1" placeholder='Product name...' className='text-inputs' onChange={e => setName(e.target.value)}/>
                <input type="number" placeholder='Product price...' className='text-inputs' onChange={e => setPrice(e.target.value)}/>
                <textarea className='description' placeholder='Product description' onChange={e => setDescription(e.target.value)}></textarea>
                <div className='product-category'>
                    <label htmlFor="category">Product category:</label>
                    <div className="select-dropdown">
                        <select name="category" id='category' onChange={e => setCategory(e.target.value)}>
                            <option value="tech">Tech</option>
                            <option value="clothes">Clothes</option>
                            <option value="cars">Cars</option>
                            <option value="kids">Kids</option>
                        </select>
                    </div>
                </div>
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
                <input type="button" className='submit-form-btn' value='SELL' onClick={handleForm}/>

                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    );
}

export default NewProduct;