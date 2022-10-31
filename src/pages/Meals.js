import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../component/Header';
import ReceitasContext from '../context/ReceitasContext';
import Card from '../component/Card';
import Footer from '../component/Footer';
import Recipes from './Recipes';

function Meals() {
  const { receitas, renderiza } = useContext(ReceitasContext);
  const path = window.location.pathname;
  const route = useHistory();
  return (
    <div>
      <Header title="Meals" />
      {receitas && receitas.length === 1
        ? route.push(`/meals/${receitas[0].idMeal}`)
        : receitas
          && receitas
            // .slice(0, +'12')
            .map((recipes, id) => (
              <Card
                key={ id }
                onClick={ path === '/meals'
                  ? () => route.push(`/meals/${recipes.idMeal}`)
                  : () => route.push(`/drinks/${recipes.idDrink}`) }
                onKeyDown={ path === '/meals'
                  ? () => route.push(`/meals/${recipes.idMeal}`)
                  : () => route.push(`/drinks/${recipes.idDrink}`) }
                name={ recipes.strMeal }
                dataTest={ `${id}-recipe-card` }
                imgTest={ `${id}-card-img` }
                imagem={ recipes.strMealThumb }
                nameTest={ `${id}-card-name` }
              />
            ))}
      { renderiza ? <Recipes /> : null }
      <Footer />
    </div>
  );
}

export default Meals;
