import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apiDrinkId, apiMealId } from '../helper/fetchApi';
import Buttons from '../component/Buttons';
import CardDetail from '../component/CardDetail';
import ReceitasContext from '../context/ReceitasContext';
import '../CSS/RecipeDetails.css';
import Header from '../component/Header';

function InProgress() {
  const [receita, setReceita] = useState({});
  const { usado } = useContext(ReceitasContext);
  const route = useHistory();
  const {
    location: { pathname },
  } = useHistory();
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1];
  const site = type === 'meals' ? 'Meal' : 'Drink';

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

  const handleClick = () => {
    route.push('/done-recipes');

    const localDone = JSON.parse(localStorage.getItem('doneRecipes'));

    const newDone = {
      id: receita[`id${site}`],
      type: type.replace('s', ''),
      nationality: receita.strArea || '',
      category: receita.strCategory || '',
      alcoholicOrNot: receita.strAlcoholic || '',
      name: receita[`str${site}`],
      image: receita[`str${site}Thumb`],
      doneDate: new Date().toISOString(),
      tags: receita.strTags?.split(',') || [],
    };

    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...localDone, newDone]),
    );
  };

  return (
    <>
      <Header title=" In Progress" />
      <CardDetail />
      <Buttons />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ usado.length !== ingrediente().length }
        onClick={ handleClick }
        className="buttonfim"
      >
        Finish Recipe
      </button>
    </>
  );
}

export default InProgress;
