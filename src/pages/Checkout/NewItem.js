import React from 'react';
import { useDispatch } from 'react-redux';
import {
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from '../../redux/checkoutSlice';

const NewItem = ({ product }) => {
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
    <div className='cart-item'>
      <img className='item-img' src={product.image} alt={product.name} />
      <div className='item-info'>
        <h3>{product.name}</h3>
        <div>
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
        </div>
        <p>Product price: ${product.price}</p>
      </div>
      <div className='item-delete-button'>
        <button type='button' className='cart-btn' onClick={handleDelete}>
          X
        </button>
      </div>
    </div>
  );
};

export default NewItem;
