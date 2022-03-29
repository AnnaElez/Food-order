import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../../UI/Card/Card';
import MealItem from '../MealItem/MealItem';


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false)


  useEffect(() => {

    const MealsFetch = async () => {
      const response = await fetch('https://foodorder-17472-default-rtdb.firebaseio.com/MEALS.json')

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }


      const responseData = await response.json()

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)

      console.log(meals)

    }

    MealsFetch().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    MealsFetch()
  }, [])

  if (isLoading) {
    return <section className={classes.load}>LOADING...</section>
  }

  if (httpError) {
    return <section className={classes.load}>{httpError}</section>
  }

  const MealsList = meals.map(meal =>
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price} />
  )

  return (
    <React.Fragment>
      <section className={classes.meals}>

        <ul>{MealsList}</ul>
      </section>

    </React.Fragment >
  )
};

export default AvailableMeals;