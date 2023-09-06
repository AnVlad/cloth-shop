import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../redux/modalSlice';
import Button from '../../components/forms/Button';
import { deleteProductById, setStartProducts } from '../../redux/productsSlice';

import './style.scss';

const Admin = () => {
  const dispatch = useDispatch();
  const showModalWindow = () => {
    dispatch(showModal());
  };

  const products = useSelector((state) => state.product);

  useEffect(() => {
    if (products.length > 0) return;
    dispatch(setStartProducts());
  }, []);

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
                            <img src={product.image} alt={product.name} />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.price} €</td>
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
