import React, { useContext, useState } from 'react';

import Modal from '../../UI/Modal/Modal'
import CartItem from '../CartItem/CartItem';
import classes from './Cart.module.css';
import CartContext from '../../../store/cart-context';
import Checkout from '../Checkout/Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmitting, setDidSubmitting] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://foodorder-17472-default-rtdb.firebaseio.com/ORDER.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });

        setIsSubmitting(false);
        setDidSubmitting(true)
        cartCtx.clearCart()
    };


    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );


    const cardModalContent =
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckout && modalActions}
        </React.Fragment>

    const isSubmittingModalContent = <p>Sending order...</p>
    const didSubmittingModalContent = <p>Successfully sent the order!</p>
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmitting && cardModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmitting && didSubmittingModalContent}
        </Modal>
    );
};

export default Cart;