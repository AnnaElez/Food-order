import React from 'react';
import classes from './Header.module.css';
import mealsImage from '../../../assets/meals.jpg'
import HeaderCartButton from '../HeaderButton/HeaderCartButton';

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1> Meals </h1>
                <HeaderCartButton onClick = {props.onClick} onClose = {props.onClose}/>
            </header>

            <div className={classes['main-image']}>
                <img src={mealsImage} alt='A table Full of FOOOOOOD' />
            </div>


        </React.Fragment >
    )
};

export default Header;