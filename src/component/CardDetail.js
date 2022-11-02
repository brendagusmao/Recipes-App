import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import { apiDrinkId, apiMealId } from '../helper/fetchApi';

function CardDetail() {
  const [receita, setReceita] = useState({});
  const { handleCheckbox } = useContext(ReceitasContext);
  const {
    location: { pathname },
  } = useHistory();
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1];

  useEffect(() => {
    const result = async () => {
      if (type === 'meals') {
        const data = await apiMealId(id);
        setReceita(data[0]);
      } else {
        const datas = await apiDrinkId(id);
        setReceita(datas[0]);
      }
    };
    result();
  }, [id, type]);
  const ingrediente = () => {
    const resultado = [];
    const maximo = 20;
    for (let i = 1; i <= maximo; i += 1) {
      if (
        receita[`strIngredient${i}`] !== ''
        && receita[`strIngredient${i}`] !== null
        && receita[`strIngredient${i}`] !== undefined
        && receita[`strMeasure${i}`] !== ''
        && receita[`strMeasure${i}`] !== null
        && receita[`strMeasure${i}`] !== undefined
      ) {
        resultado.push({
          ingrediente: receita[`strIngredient${i}`],
          medida: receita[`strMeasure${i}`],
        });
      }
    }
    return resultado;
  };

  return (
    <>
      <img
        src={ receita.strMealThumb || receita.strDrinkThumb }
        alt={ receita.strMeal || receita.strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{receita.strMeal || receita.strDrink}</h1>
      {type === 'meals' ? (
        <h1 data-testid="recipe-category">{receita.strCategory}</h1>
      ) : (
        <h1 data-testid="recipe-category">{receita.strAlcoholic}</h1>
      )}
      <p data-testid="instructions">{receita.strInstructions}</p>
      {pathname.includes('in-progress') ? (
        <ul>
          {ingrediente().map((element, index) => (
            <li key={ index }>
              <label htmlFor={ element } data-testid={ `${index}-ingredient-step` }>
                <input
                  type="checkbox"
                  id={ element }
                  value={ element }
                  onChange={ (event) => handleCheckbox(event, element) }
                />
                {`${element.medida[index]} ${element.ingrediente}`}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        ingrediente().map((element, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {element.ingrediente}
            {' '}
            {element.medida}
          </p>
        ))
      )}
    </>
  );
}

export default CardDetail;
