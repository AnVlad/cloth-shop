import React from 'react';
import Header from '../components/Header/Header';

const MainLayout = ({ children, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <div className='main'>{children}</div>
    </>
  );
};

export default MainLayout;
