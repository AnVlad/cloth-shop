import React from 'react';

const FormSelect = ({ label, options, handleChange }) => {
  if (!Array.isArray(options) || options.length < 1) return null;

  return (
    <div className='form-row'>
      {label && <label>{label}</label>}
      <select className='form-select' onChange={handleChange}>
        {options.map((option, index) => {
          const { value, name } = option;

          return (
            <option key={index} value={value}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
