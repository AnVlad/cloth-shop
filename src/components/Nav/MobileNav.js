import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.scss';

const MobileNav = () => {
  const totalQuantity = useSelector((state) =>
    state.checkout.reduce((total, item) => item.quantity + total, 0)
  );

  const user = useSelector((state) => state.currentUser.currentUser);

  return (
    <div className='mobile-nav'>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/search'>Search</Link>
          </li>

          {user ? (
            <li>
              <Link to='/cart'>
                Cart {totalQuantity > 0 && ` (${totalQuantity})`}
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
