import '../../styles/product/description.scss';
const ProductDescription = ({ description }) => {
    return (
        <div className="description-container">
            <h2>Description</h2>
            <p className="description">{description}</p>
        </div>
    );
}

export default ProductDescription;