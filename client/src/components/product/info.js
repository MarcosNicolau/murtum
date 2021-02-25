import { useState } from 'react';
import '../../styles/product/info.scss';

const ProductInfo = ({ images, name, price }) => {
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
                <div className="action-btns">
                    <button className='buy-now-btn'>Buy now</button>
                    <button className='add-to-cart-btn'>Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;