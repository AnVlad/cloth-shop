import React from 'react';
import './styles.scss';

const Button = ({ children, onClick, props }) => {
  return (
    <button className='button' onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
