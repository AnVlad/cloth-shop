import React from 'react';

const ModalLayout = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className='modal-window'>
      {children}
    </div>
  );
};

export default ModalLayout;
