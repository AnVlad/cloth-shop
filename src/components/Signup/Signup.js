import React, { useState } from 'react';
import './styles.scss';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import SignDisplay from '../SignDisplay/SignDisplay';
import { auth, handleUserProfile } from '../../firebase/utils';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useField from '../../hooks/useField';

const Signup = () => {
  const displayName = useField('displayName');
  const email = useField('email');
  const password = useField('password');
  const confirmPassword = useField('confirmPassword');

  const [errorMessage, setErrorMessage] = useState([]);

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

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      const name = displayName.value;
      await handleUserProfile(user, { displayName: name });
    } catch (error) {
      console.log(error);
    }

    clearFields();
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
