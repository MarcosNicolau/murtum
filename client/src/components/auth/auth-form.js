import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../../styles/form.scss';

const AuthForm = ({ type, formAction, redirect }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleForm = async () => {
        if(!username || !password) return setError('Complete all the fields');
        try {
            const res = await axios.post(`/auth/${formAction}`, { username, password });
            window.location.href = res.data;
        }
        catch(err){
            const error = err.response;
            if(error.status === 400) return setError(error.data);
        }
    }

    return(
        <div className="form-container">
            <h2>{type}</h2>
            <form>
                <input type="text" placeholder='Username...' className='text-inputs' onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder='Password...' className='text-inputs' onChange={(e) => setPassword(e.target.value)}/>
                <input type="button" className='submit-form-btn' value={type} onClick={handleForm}/>
                <Link className='already' to={redirect}>{`Already ${type}?`}</Link>
            </form>
            {error && <p className='form-error'><FontAwesomeIcon icon={faExclamation}/> {error}</p>}
        </div>
    );
}

export default AuthForm;