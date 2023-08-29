import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import './styles.scss';

import Button from '../forms/Button';
import { auth, signInByGoogle } from '../../firebase/utils';
import SignDisplay from '../SignDisplay/SignDisplay';
import FormInput from '../forms/FormInput';
import useField from '../../hooks/useField';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      navigate();
    } catch (error) {
      console.log(error);
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
            <Button
              onClick={(event) => {
                event.preventDefault();
                signInByGoogle();
              }}>
              Sign in with Google
            </Button>
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
