import AuthForm from './auth-form';

const LogIn = () => {
    return <AuthForm formAction={'login'} type={'Login'} redirect={'/sign-in'}/>
}

export default LogIn;