import React from 'react';
import Button from '../forms/Button';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, name, price, image }) => {
  if (!image || !id || !name || typeof price === 'undefined') {
    return null;
  }
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
              <Button>Add to cart</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductItem;
