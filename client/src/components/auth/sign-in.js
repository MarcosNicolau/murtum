import AuthForm from './auth-form';
import { useUserContext } from '../../user-context';

const SignIn = () => {
    const user = useUserContext();
    if(user) return window.location.href = '/';
    return <AuthForm formAction={'sign-in'} type={'Sign In'} redirect={'/login'}/>;
}

export default SignIn;