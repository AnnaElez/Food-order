import classes from './App.module.css';
import React, { useState } from 'react';
import Header from './component/Layout/Header/Header';
import Meals from './component/Meal/Meals/Meals';
import Cart from './component/Cart/Cart/Cart';
import CartProvider from './store/CartProvider';


function App() {

  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal(true);
  }

  const closeModalHandler = () => {
    setOpenModal(false);
  }
  return (
    <CartProvider>
      {openModal && <Cart onClose={closeModalHandler} />}

      <Header onClick={openModalHandler} onClose={closeModalHandler} />
      <main className={classes.main}>
        <Meals />

      </main>
    </CartProvider>

  );
}

export default App;
