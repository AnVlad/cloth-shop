import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutCurrentUser } from '../../redux/userSlice';

import './style.scss';

const DesktopNav = () => {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const totalQuantity = useSelector((state) =>
    state.checkout.reduce((total, item) => item.quantity + total, 0)
  );
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutCurrentUser());
  };

  return (
    <div className='desktop-nav'>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/search'>Search</Link>
          </li>
        </ul>
      </nav>

      <div className='call-to-actions'>
        {currentUser ? (
          <ul>
            <li className='call-to-actions-cart'>
              <Link to='/cart'>
                Cart {totalQuantity > 0 && ` (${totalQuantity})`}
              </Link>
            </li>
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
  );
};

export default DesktopNav;
