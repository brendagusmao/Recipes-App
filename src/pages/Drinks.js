import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../component/Header';
import ReceitasContext from '../context/ReceitasContext';
import Recipes from './Recipes';

function Drinks() {
  const route = useHistory();
  const { receitas } = useContext(ReceitasContext);

  return (
    <div>
      <Header
        title="Drinks"
      />
      {receitas.length === 1 ? route.push(`/drinks/${receitas[0].idDrink}`)
        : receitas.map((recipe, id) => (
          <Recipes
            str={ recipe.strDrink }
            strThumb={ recipe.strDrinkThumb }
            key={ recipe.idDrink }
            testId={ `${id}-recipe-card` }
            testImg={ `${id}-card-img` }
            testName={ `${id}-card-name` }
          />
        ))}
    </div>
  );
}

export default Drinks;
