import React, { useState } from 'react';
import './style.scss';
import { CountryDropdown } from 'react-country-region-selector';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

const initialState = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
};

const PaymentDetails = () => {
  const [recipientName, setRecipientName] = useState('');
  const [shippingAddress, setShippingAddress] = useState({ ...initialState });
  const [nameOnCard, setNameOnCard] = useState('');
  const [billingAddress, setBillingAddress] = useState({ ...initialState });

  const handleShipping = (event) => {
    const { name, value } = event.target;

    setShippingAddress((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleBilling = (event) => {
    const { name, value } = event.target;

    setBillingAddress((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFromSubmit = (event) => {
    event.preventDefault();
    console.log(recipientName, shippingAddress, nameOnCard, billingAddress);
  };

  const whitelist = [
    'UA',
    'EE',
    'DE',
    'DK',
    'FR',
    'LV',
    'LT',
    'PL',
    'IT',
    'NO',
    'NL',
  ];

  return (
    <div className='payment-details'>
      <form onSubmit={handleFromSubmit}>
        <div className='group'>
          <h2>Shipping address</h2>

          <FormInput
            type='text'
            name='name'
            value={recipientName}
            onChange={(event) => setRecipientName(event.target.value)}
            placeholder='Recipient name'
          />
          <FormInput
            type='text'
            name='line1'
            value={shippingAddress.line1}
            onChange={handleShipping}
            placeholder='Line 1'
          />
          <FormInput
            type='text'
            name='line2'
            value={shippingAddress.line2}
            onChange={handleShipping}
            placeholder='Line 2'
          />
          <FormInput
            type='text'
            name='city'
            value={shippingAddress.city}
            onChange={handleShipping}
            placeholder='City'
          />
          <FormInput
            type='text'
            name='state'
            value={shippingAddress.state}
            onChange={handleShipping}
            placeholder='State'
          />
          <FormInput
            type='text'
            name='postalCode'
            value={shippingAddress.postalCode}
            onChange={handleShipping}
            placeholder='Postal code'
          />
          <div className='form-row checkout-input'>
            <CountryDropdown
              name='country'
              value={shippingAddress.country}
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: 'country',
                    value: val,
                  },
                })
              }
              valueType='short'
              whitelist={whitelist}
            />
          </div>
        </div>
        <div className='group'>
          <h2>Billing address</h2>

          <FormInput
            type='text'
            name='name'
            value={nameOnCard}
            onChange={(event) => setNameOnCard(event.target.value)}
            placeholder='Name on card'
          />
          <FormInput
            type='text'
            name='line1'
            value={billingAddress.line1}
            onChange={handleBilling}
            placeholder='Line 1'
          />
          <FormInput
            type='text'
            name='line2'
            value={billingAddress.line2}
            onChange={handleBilling}
            placeholder='Line 2'
          />
          <FormInput
            type='text'
            name='city'
            value={billingAddress.city}
            onChange={handleBilling}
            placeholder='City'
          />
          <FormInput
            type='text'
            name='state'
            value={billingAddress.state}
            onChange={handleBilling}
            placeholder='State'
          />
          <FormInput
            type='text'
            name='postalCode'
            value={billingAddress.postalCode}
            onChange={handleBilling}
            placeholder='Postal code'
          />
          <div className='form-row checkout-input'>
            <CountryDropdown
              name='country'
              value={billingAddress.country}
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: 'country',
                    value: val,
                  },
                })
              }
              valueType='short'
              whitelist={whitelist}
            />
          </div>
        </div>
        <div className='group'>
          <h2>Card details</h2>
        </div>
        <Button type='button' onClick={handleFromSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
