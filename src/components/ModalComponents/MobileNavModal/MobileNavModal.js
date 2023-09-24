import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMobileNavModal } from '../../../redux/modalSlice';
import ModalLayout from '../../../layouts/ModalLayout';
import MobileNav from '../../Nav/MobileNav';

const MobileNavModal = () => {
  const dispatch = useDispatch();

  const handleCloseMobileNav = () => {
    setShowNav(false);

    setTimeout(() => {
      dispatch(closeMobileNavModal());
    }, 1000);
  };

  const [showNav, setShowNav] = useState(false);

  const modalShowed = useSelector((state) => state.modalState.mobileNav);

  useEffect(() => {
    if (!modalShowed) return;

    setTimeout(() => {
      setShowNav(modalShowed);
    }, 0);
  }, [modalShowed]);

  return (
    <ModalLayout onClick={handleCloseMobileNav}>
      <MobileNav showNav={showNav} />
    </ModalLayout>
  );
};

export default MobileNavModal;
