import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import ReceitasContext from '../context/ReceitasContext';
import { apiDrinkId, apiMealId } from '../helper/fetchApi';
import '../CSS/RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function Buttons() {
  const [receita, setReceita] = useState({});
  const [copiado, setCopiado] = useState(false);
  const { done, continua, favorite, setFavorite } = useContext(ReceitasContext);
  const route = useHistory();
  const {
    location: { pathname },
  } = useHistory();
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1];
  const site = type === 'meals' ? 'Meal' : 'Drink';

  const favoriteButton = () => {
    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const localFavorite = {
      id: receita[`id${site}`],
      type: type.replace('s', ''),
      nationality: receita.strArea || '',
      category: receita.strCategory || '',
      alcoholicOrNot: receita.strAlcoholic || '',
      name: receita[`str${site}`],
      image: receita[`str${site}Thumb`],
    };
    if (!favoriteRecipe) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([localFavorite]));
      setFavorite([localFavorite]);
    } else {
      const newLocalFavorite = favoriteRecipe.filter(
        (e) => e.id !== receita[`id${site}`],
      );

      if (newLocalFavorite.length === favoriteRecipe.length) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...favoriteRecipe, localFavorite]),
        );
        setFavorite([...favoriteRecipe, localFavorite]);
      } else {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...newLocalFavorite]),
        );
        setFavorite([...newLocalFavorite]);
      }
    }
  };

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

  const copia = () => {
    clipboardCopy(window.location.href.replace('/in-progress', ''));
    setCopiado(true);
  };

  return (
    <div>
      {done.every((e) => e.id !== id) && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="inicialbutton"
          onClick={ () => route.push(`/${type}/${id}/in-progress`) }
        >
          {continua.length !== 0 ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
      {/* <button type="button">
    Finish Recipe
  </button> */}
      <button data-testid="share-btn" type="button" onClick={ copia }>
        <img src={ shareIcon } alt="share icon" />
        Share
      </button>
      {copiado && <p>Link copied!</p>}
      <button type="button" onClick={ favoriteButton }>
        <img
          data-testid="favorite-btn"
          src={
            favorite.some((e) => e.id === receita[`id${site}`])
              ? blackHeart
              : whiteHeart
          }
          alt="imagem do favorito"
        />
        Favorite
      </button>
    </div>
  );
}

export default Buttons;
