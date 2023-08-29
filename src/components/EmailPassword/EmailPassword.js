import React from 'react';
import { useNavigate } from 'react-router-dom';

import SignDisplay from '../SignDisplay/SignDisplay';
import useField from '../../hooks/useField';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import { useDispatch } from 'react-redux';

const EmailPassword = () => {
  const email = useField('email');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailValue = email.value;

    const result = dispatch({ email: emailValue });

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  return (
    <SignDisplay mainText={'Recover password'}>
      <div className='formWrap'>
        <form onSubmit={handleSubmit}>
          <FormInput type='email' placeholder='Email' {...email} />
          <Button type='submit'> Send </Button>
        </form>
      </div>
    </SignDisplay>
  );
};

export default EmailPassword;
