import '../../styles/product/description.scss';
const MyProductDescription = ({ description }) => {
    return (
        <div className="description-container">
            <h2>Description</h2>
            <p className="description">{description}</p>
        </div>
    );
}

export default MyProductDescription;