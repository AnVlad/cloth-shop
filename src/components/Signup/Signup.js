import React, { useState } from 'react';

import './styles.scss';

import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import SignDisplay from '../SignDisplay/SignDisplay';
import useField from '../../hooks/useField';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/authUserSlice';

const Signup = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.authUser.loading);
  console.log('loading', loading);

  const displayName = useField('displayName');
  const email = useField('email');
  const password = useField('password');
  const confirmPassword = useField('confirmPassword');

  const [errorMessage, setErrorMessage] = useState([]);

  const navigate = useNavigate();

  const clearFields = (onlyPasswords = false) => {
    password.onChange.clearField();
    confirmPassword.onChange.clearField();
    if (onlyPasswords) return;
    displayName.onChange.clearField();
    email.onChange.clearField();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password.value !== confirmPassword.value) {
      const newErrorMessage = `Password don't match`;
      setErrorMessage((prevErrors) => [...prevErrors, newErrorMessage]);
      clearFields(true);
      return;
    }

    const name = displayName.value;
    const emailValue = email.value;
    const passwordValue = password.value;

    const result = await dispatch(
      createUser({ email: emailValue, password: passwordValue, name })
    );

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <SignDisplay mainText={'Signup'}>
      {errorMessage.length > 0 && (
        <ul>
          {errorMessage.map((error, index) => {
            return <li key={index}>{error}</li>;
          })}
        </ul>
      )}

      <div className='form-wrap'>
        <form onSubmit={handleFormSubmit}>
          <FormInput type='text' placeholder='Full name' {...displayName} />

          <FormInput type='text' placeholder='Email' {...email} />

          <FormInput type='text' placeholder='Password' {...password} />

          <FormInput
            type='text'
            placeholder='Confirm password'
            {...confirmPassword}
          />

          <Button>Register</Button>
        </form>
      </div>
    </SignDisplay>
  );
};

export default Signup;
