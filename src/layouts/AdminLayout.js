import React from 'react';
import { Link } from 'react-router-dom';
import VerticalNav from '../components/VerticalNav/VerticalNav';
import { useDispatch } from 'react-redux';
import { logoutCurrentUser } from '../redux/userSlice';

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();

  const handleSignOut = (event) => {
    event.preventDefault();
    dispatch(logoutCurrentUser());
  };
  return (
    <div className='admin-layout'>
      <div className='sidebar'>
        <VerticalNav>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <a href='*' onClick={handleSignOut}>
                Log out
              </a>
            </li>
          </ul>
        </VerticalNav>
      </div>
      <div className='content'>{children}</div>
    </div>
  );
};

export default AdminLayout;
