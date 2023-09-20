import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { checkUserIsAdmin } from '../utils/checkUserIsAdmin';

const MainLayout = ({ children, currentUser }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (checkUserIsAdmin(currentUser)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  return (
    <>
      <Header currentUser={currentUser} />
      <div className={`main ${isAdmin ? 'main-admin' : ''}`}>{children}</div>
    </>
  );
};

export default MainLayout;
