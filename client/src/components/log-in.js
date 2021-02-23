import AuthForm from './auth-form';
import { useUserContext } from '../user-context';

const LogIn = () => {
    const user = useUserContext();
    if(user) return window.location.href = '/';
    return <AuthForm formAction={'login'} type={'Login'} redirect={'/sign-in'}/>
}

export default LogIn;