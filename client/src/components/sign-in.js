import AuthForm from './auth-form';

const SignIn = () => {
    return <AuthForm formAction={'sign-in'} type={'Sign In'} redirect={'/login'}/>;
}

export default SignIn;