import React from 'react';
import UserProfile from '../UserProfile/UserProfile';
import './style.scss';

const VerticalNav = ({ children }) => {
  return (
    <div className='vertical-nav'>
      <UserProfile />

      <div className='menu'>{children}</div>
    </div>
  );
};

export default VerticalNav;
