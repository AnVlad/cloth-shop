import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './styles.scss';

import Button from '../forms/Button';
import SignDisplay from '../SignDisplay/SignDisplay';
import FormInput from '../forms/FormInput';
import useField from '../../hooks/useField';
import { useDispatch } from 'react-redux';
import { createUserByGoogle, singInUser } from '../../redux/userSlice';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInByGoogle = (event) => {
    event.preventDefault();

    dispatch(createUserByGoogle());
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailValue = email.value;
    const passwordValue = password.value;

    const result = dispatch(
      singInUser({ email: emailValue, password: passwordValue })
    );

    if (result.meta?.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  const email = useField('email');
  const password = useField('password');

  return (
    <SignDisplay mainText={'Sign In'}>
      <form onSubmit={handleSubmit}>
        <FormInput type='email' placeholder='Email' {...email} />
        <FormInput type='password' placeholder='Password' {...password} />
        <Button type='submit'>Login</Button>
        <div className='social-signIn'>
          <div className='row'>
            <Button onClick={signInByGoogle}>Sign in with Google</Button>
          </div>
        </div>
        <div className='recover-link'>
          <Link to='/recovery'>Reset password</Link>
        </div>
      </form>
    </SignDisplay>
  );
};

export default SignIn;
