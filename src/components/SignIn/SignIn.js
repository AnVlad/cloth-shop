import React from 'react';

import './styles.scss';
import Button from '../forms/Button';
import { auth, signInByGoogle } from '../../firebase/utils';
import SignDisplay from '../SignDisplay/SignDisplay';
import FormInput from '../forms/FormInput';
import useField from '../../hooks/useField';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
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
            <Button onClick={signInByGoogle}>Sign in with Google</Button>
          </div>
        </div>
      </form>
    </SignDisplay>
  );
};

export default SignIn;
