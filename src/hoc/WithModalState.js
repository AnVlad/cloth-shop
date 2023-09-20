import React from 'react';

const WithModalState = ({ children, state }) => {
  if (!state) return null;

  return <>{children}</>;
};

export default WithModalState;
