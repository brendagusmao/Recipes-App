import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShareSquare } from 'react-icons/fa';
import copy from 'clipboard-copy';
import Header from '../component/Header';
// import shareIcon from '../images/shareIcon.svg';

import '../CSS/RecipeDetails.css';

function DoneRecipes() {
  const [done, setDone] = useState([]);
  const [copiado, setCopiado] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const takeDone = JSON.parse(localStorage.getItem('doneRecipes'));
    setDone(takeDone);
  }, []);

  const url = window.location.href.replace('/done-recipes', '');

  return (
    <div className="containerrecipes">
      <Header title="Done Recipes" />
      <div className="menu2">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ () => setFilter('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          value="meal"
          onClick={ () => setFilter('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div className="cardDetails">
        {done
          ? done
            .filter((e) => e.type.includes(filter))
            .map((element, index) => (
              <div key={ index }>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="cardDetailsTitle"
                >
                  {element.type}
                </p>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="subtitle"
                >
                  {element.nationality}
                  {' '}
                  -
                  {' '}
                  {element.category}
                </p>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                  className="subtitle"
                >
                  {element.doneDate}
                </p>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="subtitle"
                >
                  {element.alcoholicOrNot}
                </p>
                <Link to={ `/${element.type}s/${element.id}` }>
                  <img
                    src={ element.image }
                    alt={ element.name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    className="cardtitlee"
                  >
                    {element.name}
                  </p>
                </Link>
                <p
                  data-testid={ `${index}-${element.tags[0]}-horizontal-tag` }
                  className="cardtitlee"
                  style={ { justifyContent: 'space-between' } }
                >
                  {element.tags[0]}
                  {' '}
                  -
                  {' '}
                  {element.tags[1]}
                  {copiado ? (
                    <span className="cardspan">Link copiado!</span>
                  ) : (
                    <div className="doneShare">
                      <button
                        type="button"
                        onClick={ () => copy(`${url}/${element.type}s/${element.id}`)
                && setCopiado(true) }
                      >
                        <FaShareSquare />
                      </button>
                    </div>
                  )}
                </p>
                {/* <p
                  data-testid={ `${index}-${element.tags[1]}-horizontal-tag` }
                  className="cardtitlee"
                >
                  {element.tags[1]}
                </p> */}

              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default DoneRecipes;
