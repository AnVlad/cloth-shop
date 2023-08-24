import React from 'react';
import Header from '../components/Header/Header';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='main'>{children}</div>
    </>
  );
};

export default MainLayout;
