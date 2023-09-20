import React from 'react';
import { useDispatch } from 'react-redux';
import { closeMobileNavModal } from '../../../redux/modalSlice';
import ModalLayout from '../../../layouts/ModalLayout';
import MobileNav from '../../Nav/MobileNav';

const MobileNavModal = () => {
  const dispatch = useDispatch();

  const handleCloseMobileNav = () => {
    dispatch(closeMobileNavModal());
  };

  return (
    <ModalLayout onClick={handleCloseMobileNav}>
      <MobileNav />
    </ModalLayout>
  );
};

export default MobileNavModal;
