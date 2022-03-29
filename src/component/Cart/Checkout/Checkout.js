import React, { useState } from 'react';
import classes from './Checkout.module.css';
import useInput from '../../hooks/useInput';

const Checkout = (props) => {

  const {
    value: enteredName,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    isValid: nameIsValid,
    reset: nameReset
  } = useInput(name => name.trim() != '');

  const {
    value: enteredAddress,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    valueBlurHandler: addressBlurHandler,
    isValid: addressIsValid,
    reset: addressReset
  } = useInput(address => address.trim() != '');

  const {
    value: enteredCity,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    isValid: cityIsValid,
    reset: cityReset
  } = useInput(city => city.trim() != '');


  const confirmHandler = (event) => {
    event.preventDefault();
    if (!nameIsValid || !addressIsValid || !cityIsValid) {
      return;
    }

    props.onConfirm({
      name:enteredName,
      address:enteredAddress,
      city:enteredCity
    })


  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameHasError ? classes.invalid : classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler} />
      </div>
      <div className={addressHasError ? classes.invalid : classes.control}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler} />
      </div>
      <div className={cityHasError ? classes.invalid : classes.control}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler} />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;