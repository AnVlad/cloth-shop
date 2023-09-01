import React from 'react';
import './styles.scss';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../assets/logo.png';
import { logoutCurrentUser } from '../../redux/userSlice';

const Header = () => {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const dispatch = useDispatch();

  console.log(currentUser);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutCurrentUser());
  };

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
                <Link to={'/dashboard'}>My account</Link>
              </li>
              <li>
                <a href='/' onClick={handleLogout}>
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
