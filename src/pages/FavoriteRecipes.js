import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TiHeartFullOutline } from 'react-icons/ti';
import { FaShareSquare } from 'react-icons/fa';
import copy from 'clipboard-copy';
import Header from '../component/Header';
// import blackHeart from '../images/blackHeartIcon.svg';

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
    <div className="containerrecipes">
      <Header title="Favorite Recipes" />
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
      <div className="cardDetails bg">
        {favorita
          ?.filter((e) => e.type.includes(filter))
          .map((element, index) => (
            <div key="index">
              <Link to={ `/${element.type}s/${element.id}` }>
                <img
                  src={ element.image }
                  alt="Imagem da receita"
                  data-testid={ `${index}-horizontal-image` }
                />
                <p
                  data-testid={ `${index}-horizontal-name` }
                  className="cardDetailsTitle"
                  style={ { color: 'var(--cor-02)' } }
                >
                  {element.name}
                  {element.type}
                </p>
              </Link>

              {/* <p
              data-testid={ `${index}-horizontal-top-text` }
              className="cardtitlee"
            >
              {element.type}

            </p> */}

              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="cardtitlee"
              >
                {element.type === 'meal'
                  ? `${element.nationality} - ${element.category}`
                  : `${element.alcoholicOrNot}`}
              </p>
              <div className="bottomshare">
                <button
                  type="button"
                  onClick={ () => handleFavorite(element.id) }
                >
                  <TiHeartFullOutline style={ { color: 'red' } } />
                </button>
                {copiado ? (
                  <span className="cardspan">Link copiado!</span>
                ) : (
                  <button
                    type="button"
                    onClick={ () => copy(`${url}/${element.type}s/${element.id}`)
                && setCopiado(true) }
                  >
                    <FaShareSquare />
                  </button>
                )}
              </div>
              {/* {copiado ? <p>Link copied!</p> : null} */}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
