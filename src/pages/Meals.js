import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../component/Header';
import ReceitasContext from '../context/ReceitasContext';
import Card from '../component/Card';

function Meals() {
  const { receitas } = useContext(ReceitasContext);
  const route = useHistory();

  return (
    <div>
      <Header
        title="Meals"
      />
      {receitas && receitas.length === 1 ? route.push(`/meals/${receitas[0].idMeal}`)
        : receitas && receitas.slice(0, +'12').map((recipes, id) => (
          <Card
            key={ id }
            name={ recipes.strMeal }
            dataTest={ `${id}-recipe-card` }
            imgTest={ `${id}-card-img` }
            imagem={ recipes.strMealThumb }
            nameTest={ `${id}-card-name` }
          />
        ))}
    </div>
  );
}

export default Meals;
