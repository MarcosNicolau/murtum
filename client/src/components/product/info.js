import { useState } from 'react';
import '../../styles/product/info.scss';
import '../../styles/product/product-responsive.scss';

const ProductInfo = ({ images, name, price, children }) => {
    const [activeImg, setActiveImg] = useState(images[0]);

    return (
        <div className="product-info">
            <div className="imgs-selector">
                {images.map((image, index) => <img key={index} src={image} alt={'product'} onMouseOver={e => setActiveImg(e.target.src)}/>)}
            </div>
            <div className="active-img-container">
                <img src={activeImg} alt="product" className="active-image"/>
            </div>
            <div className='product-name-price-actions-container'>
                <div>
                    <h3 className="name">{name}</h3>
                    <h2 className="price">${price}</h2>
                </div>
                { children }
            </div>
        </div>
    );
}

export default ProductInfo;