import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth-form.scss';

const AuthForm = ({ type, formAction, redirect }) => {
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
                <input type="text" placeholder='Username...' className='text-inputs' onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder='Password...' className='text-inputs' onChange={(e) => setPassword(e.target.value)}/>
                <input type="button" className='submit-form-btn' value={type} onClick={handleForm}/>
                <Link to={redirect}>{`Already ${type}?`}</Link>
            </form>
        </div>
    );
}

export default AuthForm;