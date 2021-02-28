import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = React.createContext();

export const useUserContext = () => useContext(UserContext);


export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState('loading');

    const getUser = async () => {
        try{
            const res = await axios.get('/auth/is-user-connected');
            setUser(res.data);
        }
        catch(err){
            if(err.response.status === 401) return setUser(false);
        }
    }

    useEffect(() => getUser(), []);

    return (
        <UserContext.Provider value={user}>
            { children }
        </UserContext.Provider>
    )   

}

export default UserContext;