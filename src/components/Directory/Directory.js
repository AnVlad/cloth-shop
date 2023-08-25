import React from 'react';

import ShopMen from '../../assets/shopMen.jpg';
import ShopWomen from '../../assets/shopWomen.jpg';

import './styles.scss';

const Directory = () => {
  return (
    <div className='directory'>
      <div className='wrap'>
        <div className='item' style={{ backgroundImage: `url(${ShopMen})` }}>
          <a href='*'>Shop Men</a>
        </div>
        <div className='item' style={{ backgroundImage: `url(${ShopWomen})` }}>
          <a href='*'>Shop Women</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;