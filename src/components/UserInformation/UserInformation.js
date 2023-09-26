import React, { useRef, useState } from 'react';
import useField from '../../hooks/useField';
import './style.scss';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../redux/userSlice';

const UserInformation = ({ typeField, name, defaultValue, uid }) => {
  const dispatch = useDispatch();
  const displayName = useField(name, defaultValue);

  const inputRef = useRef();

  const [editData, setEditData] = useState(false);

  const submitChanges = (event, name) => {
    event.preventDefault();

    if (displayName.value === defaultValue) {
      setEditData(false);
      return;
    }

    const newData = { [name]: event.target[name].value };

    setEditData(false);

    dispatch(updateUserData({ newData, uid }));
  };

  const handleEditData = () => {
    setEditData(true);

    //setTimeout because we don't have input in DOM yet
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  return (
    <div className='user-information'>
      <div className='information-name'>{typeField}:</div>

      {!editData ? (
        <div className='information-data'>
          <div className='information-data-name'>{defaultValue}</div>
          <button type='button' onClick={handleEditData}>
            edit
          </button>
        </div>
      ) : (
        <form
          className='information-data-change'
          onSubmit={(event) => submitChanges(event, displayName.name)}>
          <input type='text' ref={inputRef} {...displayName} />
          <button type='submit'>save</button>
        </form>
      )}
    </div>
  );
};

export default UserInformation;
