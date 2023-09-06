import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkUserIsAdmin } from '../../utils/checkUserIsAdmin';

const AdminToolbar = () => {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  const isAdmin = checkUserIsAdmin(currentUser);

  if (!isAdmin) return null;

  return (
    <div className='admin-toolbar'>
      <div className='toolbar-wrap'>
        <ul>
          <li>
            <Link to={'admin'}>My Admin</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminToolbar;
