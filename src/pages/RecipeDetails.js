import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
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
  const link = window.location.pathname;

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

  function redirectToParent() {
    const number = -1;
    const currentPathname = window.location.pathname;
    const newPathname = currentPathname.split('/').slice(0, number).join('/');
    window.location.pathname = newPathname;
  }

  const baseRoute = link.startsWith('/meals') ? '/drinks' : '/meals';

  // Define a rota completa para o link, concatenando a rota base com o ID do elemento
  // const route = `${baseRoute}/${element.idMeal || element.idDrink}`;
  return (
    <div className="containerrecipes">
      <Header title=" Details" />
      <div className="cardDetails">
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
              // onClick={ link === '/meals'
              //   ? () => route.push(`/meals/${element.idMeal}`)
              //   : () => route.push(`/drinks/${element.idDrink}`) }
            >
              <Link to={ `${baseRoute}/${element.idDrink || element.idMeal}` } key="">
                {/* {element.strMeal || element.strDrink} */}
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
              </Link>
            </div>
          ))}
        </div>
        <Buttons />
        <div className="backbutton">
          <button type="button" onClick={ redirectToParent }>
            <BsArrowLeft />
            {' '}
            keep looking
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
