import ImagesOnNormal from './on-normal';
import ImagesOnEdit from './on-edit';
import { useMyProductContext } from '../../my-product-context';


const ImagesInfo = ({ images, setProduct }) => {
    const { state } = useMyProductContext();
    return (
       <>
            {state.editImage ? 
            <ImagesOnEdit setProduct={setProduct}/> 
            : 
            <ImagesOnNormal images={images}/>}
       </>
    );
}

export default ImagesInfo;