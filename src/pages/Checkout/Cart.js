import React from 'react';
import NewItem from './NewItem';

const Cart = ({ cartItems }) => {
  return (
    <>
      {cartItems.map((item) => {
        return <NewItem key={item.id} product={item} />;
      })}
    </>
  );
};

export default Cart;
