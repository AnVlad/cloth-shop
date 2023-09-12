import React from 'react';
import Products from '../../components/Products/Products';
import { useSelector } from 'react-redux';

const Search = () => {
  const products = useSelector((state) => state.products);
  return (
    <div className='search-page'>
      <Products products={products} />
    </div>
  );
};

export default Search;
