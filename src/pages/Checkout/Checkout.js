import React from 'react';
import { useSelector } from 'react-redux';

import './style.scss';
import Cart from './Cart';

const Checkout = () => {
  const cartItems = useSelector((state) => state.checkout);
  return (
    <div className='checkout'>
      <h1>Checkout</h1>

      <div className='cart'>
        {cartItems.length > 0 ? (
          <Cart cartItems={cartItems} />
        ) : (
          <p>You have no items in your cart.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
