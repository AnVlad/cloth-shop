import { useState } from 'react';

const useField = (name, defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  onChange.clearField = () => {
    setValue('');
  };

  return {
    name,
    value,
    onChange,
  };
};

export default useField;
