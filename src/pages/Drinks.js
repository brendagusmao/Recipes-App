import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../component/Header';
import ReceitasContext from '../context/ReceitasContext';
import Card from '../component/Card';
import Footer from '../component/Footer';
import Recipes from './Recipes';

function Drinks() {
  const route = useHistory();
  const path = window.location.pathname;
  const { receitas } = useContext(ReceitasContext);

  return (
    <div className="containerrecipes">
      <Header title="Drinks" />
      <Footer />
      <div className="maincard">
        <Recipes />
        {receitas && receitas.length === 1
          ? route.push(`/drinks/${receitas[0].idDrink}`)
          : receitas
          && receitas
            .slice(0, +'12')
            .map((recipes, id) => (
              <Card
                key={ id }
                onClick={ path === '/meals'
                  ? () => route.push(`/meals/${recipes.idMeal}`)
                  : () => route.push(`/drinks/${recipes.idDrink}`) }
                onKeyDown={ path === '/meals'
                  ? () => route.push(`/meals/${recipes.idMeal}`)
                  : () => route.push(`/drinks/${recipes.idDrink}`) }
                name={ recipes.strDrink }
                dataTest={ `${id}-recipe-card` }
                imgTest={ `${id}-card-img` }
                imagem={ recipes.strDrinkThumb }
                nameTest={ `${id}-card-name` }
              />
            ))}
      </div>
    </div>
  );
}

export default Drinks;
