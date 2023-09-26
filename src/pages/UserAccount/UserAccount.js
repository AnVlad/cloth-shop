import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import UserInformation from '../../components/UserInformation/UserInformation';

const UserAccount = () => {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  return (
    <div className='user-account'>
      <h1>User profile</h1>
      <div className='user-profile'>
        <UserInformation
          typeField={'User name'}
          name={'displayName'}
          defaultValue={currentUser.displayName}
          uid={currentUser.id}
        />
        <UserInformation
          typeField={'Email'}
          name={'email'}
          defaultValue={currentUser.email}
          uid={currentUser.id}
        />
        <UserInformation
          typeField={'Phone number'}
          name={'phoneNumber'}
          defaultValue={currentUser.phoneNumber}
          uid={currentUser.id}
        />
        <UserInformation
          typeField={'Country'}
          name={'country'}
          defaultValue={currentUser.country}
          uid={currentUser.id}
        />
        <UserInformation
          typeField={'City'}
          name={'city'}
          defaultValue={currentUser.city}
          uid={currentUser.id}
        />
        <UserInformation
          typeField={'Address'}
          name={'address'}
          defaultValue={currentUser.address}
          uid={currentUser.id}
        />
      </div>
    </div>
  );
};

export default UserAccount;
