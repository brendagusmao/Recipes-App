import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../component/Header';
import shareIcon from '../images/shareIcon.svg';

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
    <div>
      <Header title="Done Recipes" />
      <div>
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
      {done
        ? done
          .filter((e) => e.type.includes(filter))
          .map((element, index) => (
            <div key={ index }>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {element.type}
              </p>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {element.nationality}
                {' '}
                -
                {' '}
                {element.category}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {element.doneDate}
              </p>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {element.alcoholicOrNot}
              </p>
              <Link to={ `/${element.type}s/${element.id}` }>
                <img
                  src={ element.image }
                  alt={ element.name }
                  data-testid={ `${index}-horizontal-image` }
                  width="300px"
                />
                <p data-testid={ `${index}-horizontal-name` }>{element.name}</p>
              </Link>
              <button
                type="button"
                onClick={ () => copy(`${url}/${element.type}s/${element.id}`)
                    && setCopiado(true) }
              >
                <img
                  src={ shareIcon }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              {copiado ? <p>Link copied!</p> : null}
              <p data-testid={ `${index}-${element.tags[0]}-horizontal-tag` }>
                {element.tags[0]}
              </p>
              <p data-testid={ `${index}-${element.tags[1]}-horizontal-tag` }>
                {element.tags[1]}
              </p>
            </div>
          ))
        : null}
    </div>
  );
}

export default DoneRecipes;
