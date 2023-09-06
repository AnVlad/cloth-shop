import React from 'react';

import './styles.scss';

const FormInput = ({ handleChange, label, placeholder, ...otherProps }) => {
  return (
    <div className='form-row'>
      {label && <label>{label}</label>}

      <input
        className='form-input'
        onChange={handleChange}
        placeholder={placeholder}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
