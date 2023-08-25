import React from 'react';
import './styles.scss';

import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import { auth } from '../../firebase/utils';

const Header = ({ currentUser }) => {
  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='logo' />
          </Link>
        </div>
        <div className='call-to-actions'>
          {currentUser ? (
            <ul>
              <li>
                <a
                  href='/'
                  onClick={(e) => {
                    e.preventDefault();
                    auth.signOut();
                  }}>
                  LogOut
                </a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to='/registration'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
