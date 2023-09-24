import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './style.scss';
import Cart from './Cart';
import Button from '../../components/forms/Button';

const Checkout = () => {
  const cartItems = useSelector((state) => state.checkout);
  const total = cartItems.reduce(
    (prev, current) => prev + current.price * current.quantity,
    0
  );

  const navigate = useNavigate();
  const handleContinueShopping = () => {
    navigate(-1);
  };
  const handleToCheckout = () => {
    navigate('/payment');
  };
  return (
    <div className='checkout'>
      <div className='checkout-list'>
        <h1>Checkout</h1>

        <div className='cart'>
          {cartItems.length > 0 ? (
            <Cart cartItems={cartItems} />
          ) : (
            <p>You have no items in your cart.</p>
          )}
        </div>
      </div>
      <div>
        <div>
          <h3>Total: {total}$</h3>
        </div>

        <div className='cart-nav'>
          <Button onClick={handleContinueShopping}>Continue Shopping</Button>
          <Button onClick={handleToCheckout}>Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
