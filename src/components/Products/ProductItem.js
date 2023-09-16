import React from 'react';
import Button from '../forms/Button';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/checkoutSlice';
import { useDispatch } from 'react-redux';

const ProductItem = ({ product }) => {
  const { id, name, price, image } = product;

  const dispatch = useDispatch();

  if (!image || !id || !name || typeof price === 'undefined') {
    return null;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className='product'>
      <div className='product-image'>
        <img src={image} alt={name} />
      </div>
      <div className='details'>
        <ul>
          <Link to={`/product/${id}`}>
            <li>
              <span className='name'>{name}</span>
            </li>
            <li>
              <span className='price'> € {price}</span>
            </li>
          </Link>

          <li>
            <div className='add-to-cart'>
              <Button type='button' onClick={handleAddToCart}>
                Add to cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductItem;
