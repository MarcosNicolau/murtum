import { useState } from 'react';
import axios from 'axios';
import '../styles/auth-form.scss';

const AuthForm = ({ type, formAction }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleForm = async () => {
        if(!username || !password) return;
        try {
            const res = await axios.post(`/auth/${formAction}`, { username, password });
            window.location.href = res.data;
        }
        catch(err){
            console.log(err.response);
        }
    }

    return(
        <div className="auth-form-container">
            <h2>{type}</h2>
            <form>
                <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="button" value="sign-in" onClick={handleForm}/>
            </form>
        </div>
    );
}

export default AuthForm;