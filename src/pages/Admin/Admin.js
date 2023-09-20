import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showProductModal } from '../../redux/modalSlice';
import Button from '../../components/forms/Button';
import { deleteProductById } from '../../redux/productsSlice';

import './style.scss';
import { Link } from 'react-router-dom';

const Admin = () => {
  const dispatch = useDispatch();
  const showModalWindow = () => {
    dispatch(showProductModal());
  };

  const products = useSelector((state) => state.products);

  const handleDelete = (id) => {
    dispatch(deleteProductById({ id }));
  };

  return (
    <div>
      <Button onClick={showModalWindow}>Add new product</Button>

      <div className='manage-products'>
        <table>
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>

            <tr>
              <td>
                <table className='products-list'>
                  <tbody>
                    {products.map((product) => {
                      return (
                        <tr key={product.id}>
                          <td>
                            <Link to={`/product/${product.id}`}>
                              <img src={product.image} alt={product.name} />
                            </Link>
                          </td>
                          <td>{product.name}</td>
                          <td> € {product.price}</td>

                          <td>
                            <Button onClick={() => handleDelete(product.id)}>
                              delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
