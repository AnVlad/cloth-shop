import React from 'react';
import { useSelector } from 'react-redux';
import user from '../../assets/user.png';

import './style.scss';

const UserProfile = () => {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  return (
    <div className='user-profile'>
      <ul>
        <li>
          <div className='img'>
            <img src={user} alt='user' />
          </div>
        </li>
        <li>
          <span className='display-name'>
            {currentUser?.displayName && currentUser.displayName}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
