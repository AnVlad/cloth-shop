import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.scss';

import ProductItem from './ProductItem';
import FormSelect from '../forms/FormSelect';

const Products = ({ products }) => {
  const navigate = useNavigate();
  const { filterType } = useParams();

  const filteredProducts = products.filter((product) => {
    if (filterType === undefined) return product;
    return product.category === filterType;
  });

  if (products.length < 1) {
    return (
      <div className='products'>
        <p>No search</p>
      </div>
    );
  }

  const options = [
    {
      name: 'Show all',
      value: '',
    },
    {
      name: 'Mens',
      value: 'mens',
    },
    {
      name: 'Womens',
      value: 'womens',
    },
  ];

  const handleFilterChange = (event) => {
    const filter = event.target.value;

    navigate(`/search/${filter}`);
  };

  return (
    <div className='products'>
      <h1>Browse products</h1>

      <FormSelect
        defaultValue={filterType}
        options={options}
        handleChange={handleFilterChange}
      />

      <div className='products-list'>
        {filteredProducts.map((product) => {
          return <ProductItem key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
