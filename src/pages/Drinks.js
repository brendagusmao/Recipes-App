import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../component/Header';
import ReceitasContext from '../context/ReceitasContext';
import Card from '../component/Card';

function Drinks() {
  const route = useHistory();
  const { receitas } = useContext(ReceitasContext);

  return (
    <div>
      <Header
        title="Drinks"
      />
      {receitas && receitas.length === 1 ? route.push(`/drinks/${receitas[0].idDrink}`)
        : receitas && receitas.slice(0, +'12').map((recipes, id) => (
          <Card
            key={ id }
            name={ recipes.strDrink }
            dataTest={ `${id}-recipe-card` }
            imgTest={ `${id}-card-img` }
            imagem={ recipes.strDrinkThumb }
            nameTest={ `${id}-card-name` }
          />
        ))}
    </div>
  );
}

export default Drinks;
