import React from 'react';
import { useDispatch } from 'react-redux';
import {
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from '../../redux/checkoutSlice';

const Item = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) return null;
  if (!product?.id) return null;

  const handleDelete = () => {
    dispatch(deleteFromCart(product.id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <tr className='cart-item'>
      <td>
        <img src={product.image} alt={product.name} />
      </td>
      <td>{product.name}</td>
      <td>
        <button
          type='button'
          className='cart-btn'
          onClick={handleDecreaseQuantity}>
          {'< '}
        </button>
        <span>{product.quantity}</span>
        <button
          type='button'
          className='cart-btn'
          onClick={handleIncreaseQuantity}>
          {' >'}
        </button>
      </td>
      <td>{product.price}</td>
      <td align='center'>
        <button type='button' className='cart-btn' onClick={handleDelete}>
          X
        </button>
      </td>
    </tr>
  );
};

export default Item;
