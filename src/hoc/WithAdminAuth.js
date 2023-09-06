import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkUserIsAdmin } from '../utils/checkUserIsAdmin';
import { useNavigate } from 'react-router-dom';

const WithAdminAuth = ({ children }) => {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return <>{children}</>;
};

export default WithAdminAuth;
