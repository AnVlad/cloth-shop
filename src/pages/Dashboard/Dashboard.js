import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import Button from '../../components/forms/Button';

const Dashboard = () => {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  return (
    <div className='user-account'>
      <h1>User profile</h1>
      <div className='user-profile'>
        <div className='user-information'>
          <div className='information-name'>User name:</div>
          <div className='information-data'>{currentUser.displayName}</div>
        </div>
        <div className='user-information'>
          <div className='information-name'>Email:</div>
          <div className='information-data'>{currentUser.email}</div>
        </div>
        <div className='user-information'>
          <div className='information-name'>Phone number:</div>
          <div className='information-data'>{}</div>
        </div>
        <div className='user-information'>
          <div className='information-name'>Country:</div>
          <div className='information-data'>{}</div>
        </div>
        <div className='user-information'>
          <div className='information-name'>City:</div>
          <div className='information-data'>{}</div>
        </div>
        <div className='user-information'>
          <div className='information-name'>Address:</div>
          <div className='information-data'>{}</div>
        </div>
      </div>

      <Button>Edit</Button>
    </div>
  );
};

export default Dashboard;
