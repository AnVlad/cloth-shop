import React from 'react';
import Button from '../../components/forms/Button';
import Item from './Item';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems }) => {
  const navigate = useNavigate();
  const handleContinueShopping = () => {
    navigate(-1);
  };
  const handleToCheckout = () => {
    navigate('/payment');
  };

  return (
    <table border='0' cellPadding='0' cellSpacing='0'>
      <tbody>
        <tr className='checkout-header'>
          <th>Product</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Remove</th>
        </tr>
        {cartItems.map((item) => {
          return <Item key={item.id} product={item} />;
        })}
        <tr align='left'>
          <td>
            <h3>Total:</h3>
          </td>
        </tr>
        <tr>
          <td>
            <Button onClick={handleContinueShopping}>Continue Shopping</Button>
          </td>
          <td>
            <Button onClick={handleToCheckout}>Checkout</Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Cart;
