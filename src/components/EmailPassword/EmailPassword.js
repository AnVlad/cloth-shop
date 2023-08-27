import React, { useState } from 'react';
import SignDisplay from '../SignDisplay/SignDisplay';
import useField from '../../hooks/useField';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/utils';
import { useNavigate } from 'react-router-dom';

const EmailPassword = () => {
  const email = useField('email');
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const actionCodeSettings = {
      url: window.location.href.replace('recovery', ''),
    };

    try {
      await sendPasswordResetEmail(auth, email.value, actionCodeSettings);

      navigate('/login');
    } catch (error) {
      console.log(error);
      const errorMessage = 'Email not found. Please try again';
      setErrors((prevErrors) => [...prevErrors, errorMessage]);
    }
  };

  return (
    <SignDisplay mainText={'Recover password'}>
      <div className='formWrap'>
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => {
              return <li key={index}>{error}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput type='email' placeholder='Email' {...email} />
          <Button type='submit'> Send </Button>
        </form>
      </div>
    </SignDisplay>
  );
};

export default EmailPassword;
