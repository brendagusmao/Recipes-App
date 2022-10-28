import React, { useContext } from 'react';
import Card from '../component/Card';
import ReceitasContext from '../context/ReceitasContext';

function Recipes() {
  const { receitas, meal, drink } = useContext(ReceitasContext);
  return (
    <div>
      {!receitas
        ? meal.map((recipe, id) => (
          <Card
            key={ id }
            name={ recipe.strMeal }
            dataTest={ `${id}-recipe-card` }
            imgTest={ `${id}-card-img` }
            imagem={ recipe.strMealThumb }
            nameTest={ `${id}-card-name` }
          />
        )) : meal.map((recipes, id) => (
          <Card
            key={ id }
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
            name={ recipe.strDrink }
            dataTest={ `${id}-recipe-card` }
            imgTest={ `${id}-card-img` }
            imagem={ recipe.strDrinkThumb }
            nameTest={ `${id}-card-name` }
          />
        )) : drink.map((recipes, id) => (
          <Card
            key={ id }
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
