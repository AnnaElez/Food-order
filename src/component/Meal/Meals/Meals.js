import React from 'react';
import MealsSummary from '../MealsSummary/MealsSummary'; 
import AvailableMeals from '../Available/AvailableMeals';
import classes from './Meals.module.css';


const Meals = () => {

    return (
        <React.Fragment>
            <MealsSummary/>
            <AvailableMeals/>

        </React.Fragment >
    )
};

export default Meals;