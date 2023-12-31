import React from 'react';

import ShopMen from '../../assets/shopMen.jpg';
import ShopWomen from '../../assets/shopWomen.jpg';

import './styles.scss';
import { Link } from 'react-router-dom';

const Directory = () => {
  return (
    <div className='directory'>
      <div className='wrap'>
        <div className='item' style={{ backgroundImage: `url(${ShopMen})` }}>
          <Link to='/search/mens'>Shop Men</Link>
        </div>
        <div className='item' style={{ backgroundImage: `url(${ShopWomen})` }}>
          <Link to='/search/womens'>Shop Women</Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
