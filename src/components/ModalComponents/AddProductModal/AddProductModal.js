import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import useField from '../../../hooks/useField';
import { createProduct } from '../../../redux/productsSlice';
import { closeProductModal } from '../../../redux/modalSlice';
import ModalLayout from '../../../layouts/ModalLayout';
import FormSelect from '../../forms/FormSelect';
import FormInput from '../../forms/FormInput';
import Button from '../../forms/Button';

const AddProductModal = () => {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const dispatch = useDispatch();

  const name = useField('name');
  const image = useField('image');
  const price = useField('price');
  const [description, setDescription] = useState('');

  const [category, setCategory] = useState('mens');

  const options = [
    { value: 'mens', name: 'Mens' },
    { value: 'womens', name: 'womens' },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const uid = currentUser?.id;

    const newProduct = {
      name: name.value.trim(),
      image: image.value,
      price: Number(price.value),
      category: category,
      uid: uid,
      description: description,
    };

    dispatch(createProduct({ ...newProduct }));

    dispatch(closeProductModal());
  };

  const handleCloseWindow = () => {
    dispatch(closeProductModal());
  };

  console.log(description);

  return (
    <ModalLayout onClick={handleCloseWindow}>
      <div
        onClick={(event) => event.stopPropagation()}
        className='main-content'>
        <form onSubmit={handleSubmit}>
          <h2>Add new product</h2>
          <FormSelect
            label={'Category'}
            options={options}
            handleChange={(event) => setCategory(event.target.value)}
          />
          <FormInput type='text' label={'Name'} {...name} />
          <FormInput type='text' label={'Main image url'} {...image} />
          <FormInput type='number' label={'Price'} {...price} />
          <textarea
            rows='22'
            cols='67'
            onChange={(event) => setDescription(event.target.value)}
          />
          <br />
          <Button type='submit'>Add product</Button>
        </form>
      </div>
    </ModalLayout>
  );
};

export default AddProductModal;
