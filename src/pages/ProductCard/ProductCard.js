import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addIndividualProduct } from '../../redux/individualProducts';
import Button from '../../components/forms/Button';

import './style.scss';

const ProductCard = () => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const individualProducts = useSelector((state) => state.individualProducts);

  useEffect(() => {
    const existFetchedProduct = individualProducts.find((product) => {
      return product.id === id;
    });

    if (existFetchedProduct) {
      setProduct(existFetchedProduct);
      return;
    }

    dispatch(addIndividualProduct({ id }));
  }, [dispatch, id, individualProducts]);

  if (!product?.id) {
    return <div>No product find</div>;
  }

  return (
    <div className='product-card'>
      <div className='hero'>
        <img src={product?.image} alt={product?.name} />
      </div>
      <div className='product-details'>
        <ul>
          <li>
            <h1>{product.name}</h1>
          </li>
          <li>
            <span>€ {product.price}</span>
          </li>
          <li>{product?.description && product?.description}</li>
          <li>
            <div className='add-to-cart'>
              <Button type='button'>Add to Cart</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
