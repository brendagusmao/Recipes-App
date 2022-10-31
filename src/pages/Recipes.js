import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../component/Card';
import ReceitasContext from '../context/ReceitasContext';
import '../CSS/Card.css';

function Recipes() {
  const path = window.location.pathname;
  const route = useHistory();
  const { receitas,
    meal,
    drink,
    mealCategory,
    drinkCategory,
    mealClick,
    drinkClick,
    filtro,
    deleteAll,
  } = useContext(ReceitasContext);

  return (
    <div className="main">
      <div className="menu">
        {window.location.pathname.includes('meals')
      && mealCategory.map((element, index) => (
        <button
          data-testid={ `${element.strCategory}-category-filter` }
          key={ index }
          type="button"
          value={ element.strCategory }
          onClick={ (event) => mealClick(event.target.value) }
        >
          { element.strCategory }
        </button>
      ))}
        {window.location.pathname.includes('drinks')
      && drinkCategory.map((element, i) => (
        <button
          data-testid={ `${element.strCategory}-category-filter` }
          key={ i }
          type="button"
          value={ element.strCategory }
          onClick={ (event) => drinkClick(event.target.value) }
        >
          { element.strCategory }
        </button>
      ))}
        <button
          type="button"
          onClick={ deleteAll }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
      {filtro && filtro.map((element, index) => (
        <Card
          key={ index }
          onClick={ path === '/meals'
            ? () => route.push(`/meals/${element.idMeal}`)
            : () => route.push(`/drinks/${element.idDrink}`) }
          // onKeyDown={ pathName === '/meals'
          //   ? () => route.push(`/meals/${element.idMeal}`)
          //   : () => route.push(`/drinks/${element.idDrink}`) }
          name={ element.strMeal || element.strDrink }
          dataTest={ `${index}-recipe-card` }
          imgTest={ `${index}-card-img` }
          imagem={ element.strMealThumb || element.strDrinkThumb }
          nameTest={ `${index}-card-name` }
        />
      ))}
      {!receitas
        ? meal.map((recipe, id) => (
          <Card
            key={ id }
            onClick={ path === '/meals'
              ? () => route.push(`/meals/${recipe.idMeal}`)
              : () => route.push(`/drinks/${recipe.idDrink}`) }
            // onKeyDown={ pathName === '/meals'
            //   ? () => route.push(`/meals/${recipe.idMeal}`)
            //   : () => route.push(`/drinks/${recipe.idDrink}`) }
            name={ recipe.strMeal }
            dataTest={ `${id}-recipe-card` }
            imgTest={ `${id}-card-img` }
            imagem={ recipe.strMealThumb }
            nameTest={ `${id}-card-name` }
          />
        )) : meal.map((recipes, id) => (
          <Card
            key={ id }
            onClick={ path === '/meals'
              ? () => route.push(`/meals/${recipes.idMeal}`)
              : () => route.push(`/drinks/${recipes.idDrink}`) }
            // onKeyDown={ pathName === '/meals'
            //   ? () => route.push(`/meals/${recipes.idMeal}`)
            //   : () => route.push(`/drinks/${recipes.idDrink}`) }
            name={ recipes.strMeal }
            dataTest={ `${id}-recipe-card` }
            imgTest={ `${id}-card-img` }
            imagem={ recipes.strMealThumb }
            nameTest={ `${id}-card-name` }
          />
        ))}
      {!receitas
        ? drink.map((recipe, id) => (
          <Card
            key={ id }
            onClick={ path === '/meals'
              ? () => route.push(`/meals/${recipe.idMeal}`)
              : () => route.push(`/drinks/${recipe.idDrink}`) }
            // onKeyDown={ pathName === '/meals'
            //   ? () => route.push(`/meals/${recipe.idMeal}`)
            //   : () => route.push(`/drinks/${recipe.idDrink}`) }
            name={ recipe.strDrink }
            dataTest={ `${id}-recipe-card` }
            imgTest={ `${id}-card-img` }
            imagem={ recipe.strDrinkThumb }
            nameTest={ `${id}-card-name` }
          />
        )) : drink.map((recipes, id) => (
          <Card
            key={ id }
            onClick={ path === '/meals'
              ? () => route.push(`/meals/${recipes.idMeal}`)
              : () => route.push(`/drinks/${recipes.idDrink}`) }
            // onKeyDown={ pathName === '/meals'
            //   ? () => route.push(`/meals/${recipes.idMeal}`)
            //   : () => route.push(`/drinks/${recipes.idDrink}`) }
            name={ recipes.strDrink }
            dataTest={ `${id}-recipe-card` }
            imgTest={ `${id}-card-img` }
            imagem={ recipes.strDrinkThumb }
            nameTest={ `${id}-card-name` }
          />)) }
    </div>
  );
}

export default Recipes;
