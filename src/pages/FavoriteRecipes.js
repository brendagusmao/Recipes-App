import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../component/Header';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('');
  const [favorita, setFavorita] = useState([]);
  const [copiado, setCopiado] = useState(false);
  const {
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    const favoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorita(favoritas);
  }, []);

  const handleFavorite = (id) => {
    const localFavorite = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    const newLocalFavorite = localFavorite.filter(
      (e) => e.id !== id,
    );
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(newLocalFavorite),
    );
    setFavorita(newLocalFavorite);
  };

  const url = window.location.href.replace(pathname, '');

  return (
    <>
      <Header title="Favorite Recipes" />
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
      {favorita
        ?.filter((e) => e.type.includes(filter))
        .map((element, index) => (
          <div key="index">
            <Link to={ `/${element.type}s/${element.id}` }>
              <img
                src={ element.image }
                alt="Imagem da receita"
                data-testid={ `${index}-horizontal-image` }
                width="300px"
              />
              <p data-testid={ `${index}-horizontal-name` }>{element.name}</p>
            </Link>

            <p data-testid={ `${index}-horizontal-top-text` }>{element.type}</p>

            <p data-testid={ `${index}-horizontal-top-text` }>
              {element.type === 'meal'
                ? `${element.nationality} - ${element.category}`
                : `${element.alcoholicOrNot}`}
            </p>
            <button
              type="button"
              onClick={ () => handleFavorite(element.id) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeart }
                alt="ícone de favoritar"
              />
            </button>
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
          </div>
        ))}
    </>
  );
}

export default FavoriteRecipes;
