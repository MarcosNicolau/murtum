import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../user-context';
import infoReducer, { infoState } from './my-product-reducer';

const MyProductContext = createContext();
export const useMyProductContext = () => useContext(MyProductContext);

const MyProductContextProvider = ({ children }) => {
    const user = useUserContext();
    const { id } = useParams();
    const [state, dispatch] = useReducer(infoReducer, infoState);

    const makeChange = async (field, body, setError, setProduct) => {
        if(!body || !body.length) return setError('You must write something');
        try {
            setProduct('loading');
            const res = await axios.post(`/my-products/edit/${field}`, { [field]: body, productId: id, id: user.id });
            setProduct(res.data);
        }
        catch(err){
            const error = err.response;
            if(error.status === 400) return setError(error.data);
            if(error.status === 401) return window.location.href = '/';
        }
    }

    return (
        <MyProductContext.Provider value={{state, dispatch, makeChange}}>
            { children }
        </MyProductContext.Provider>
    );
}

export default MyProductContextProvider;