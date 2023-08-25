import React from 'react';

import './styles.scss';
import Button from '../forms/Button';
import { signInByGoogle } from '../../firebase/utils';

const SignIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='sign-in'>
      <div className='wrap'>
        <h2>Log In</h2>
        <div className='form-wrap'>
          <form onSubmit={handleSubmit}>
            <div className='social-signIn'>
              <div className='row'>
                <Button onClick={signInByGoogle}>Sign in with Google</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
