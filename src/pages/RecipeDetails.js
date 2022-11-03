import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apiDrinkId, apiMealId, apiDrink, apiMeal } from '../helper/fetchApi';
import '../CSS/RecipeDetails.css';
import Header from '../component/Header';
import Buttons from '../component/Buttons';
import CardDetail from '../component/CardDetail';

function RecipeDetails() {
  const [receita, setReceita] = useState({});
  const [recomenda, setRecomenda] = useState([]);
  const {
    location: { pathname },
  } = useHistory();
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1];

  useEffect(() => {
    const api = async () => {
      if (type === 'meals') {
        const drink = await apiDrink();
        setRecomenda(drink.slice(0, +'6'));
      } else {
        const meal = await apiMeal();
        setRecomenda(meal.slice(0, +'6'));
      }
    };
    api();
  }, [type]);

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

  return (
    <>
      <Header title=" Details" />
      <CardDetail />
      {type === 'meals' ? (
        <iframe
          data-testid="video"
          title="youtube video"
          src={ receita.strYoutube?.replace('watch?v=', 'embed/') }
          className="cardVideo"
        />
      ) : null}
      <div className="carousel">
        {recomenda.map((element, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            className="recomendation-card"
            key={ index }
          >
            <p
              data-testid={ `${index}-recommendation-title` }
              className="recommendationtitle"
            >
              {element.strMeal || element.strDrink}
            </p>
            <img
              src={ element.strMealThumb || element.strDrinkThumb }
              alt={ element.strMeal || element.strDrink }
            />
          </div>
        ))}
      </div>
      <Buttons />
    </>
  );
}

export default RecipeDetails;
