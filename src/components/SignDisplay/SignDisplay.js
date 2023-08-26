import React from 'react';
import './styles.scss';

const SignDisplay = ({ mainText, children }) => {
  return (
    <div className='sign-display'>
      <div className='wrap'>
        <h2>{mainText}</h2>
        <div className='form-wrap'>{children}</div>
      </div>
    </div>
  );
};

export default SignDisplay;
