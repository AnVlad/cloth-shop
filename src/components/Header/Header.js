import React from 'react';
import './styles.scss';

import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import DesktopNav from '../Nav/DesktopNav';
import { useDispatch } from 'react-redux';
import { showMobileNavModal } from '../../redux/modalSlice';

const Header = () => {
  const dispatch = useDispatch();

  const handleShowMobileNav = () => {
    dispatch(showMobileNavModal());
  };

  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='logo' />
          </Link>
        </div>
        <div className='show-menu-button'>
          <button type='button' onClick={handleShowMobileNav}>
            ==
          </button>
        </div>

        <DesktopNav />
      </div>
    </header>
  );
};

export default Header;
