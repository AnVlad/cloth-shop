import React from 'react';
import { useSelector } from 'react-redux';

const WithModalState = ({ children }) => {
  const modalState = useSelector((state) => state.modalState);

  if (!modalState) return null;

  return <>{children}</>;
};

export default WithModalState;
