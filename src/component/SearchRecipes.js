import React, { useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import '../CSS/Card.css';
import Meat from '../images/iconsvg/meat/meat-steak-svgrepo-com.svg';
import Break from '../images/iconsvg/meat/breakfast-svgrepo-com.svg';
import Chicken from '../images/iconsvg/meat/chicken-meat-beef-svgrepo-com.svg';
import Goat from '../images/iconsvg/meat/goat-svgrepo-com.svg';
import Dessert from '../images/iconsvg/meat/cake-with-heart-svgrepo-com.svg';
import All from '../images/iconsvg/meat/all-accounts-svgrepo-com.svg';

function SearchRecipes(/* { meallCategory, meallClick } */) {
  const {
    mealCategory,
    drinkCategory,
    mealClick,
    drinkClick,
    deleteAll,
  } = useContext(ReceitasContext);

  let categoryStyle = {}; // defina o objeto vazio de estilos
  if (window.location.pathname.includes('meals')) { // verifique se a rota atual inclui 'meals'
    categoryStyle = {
      category1: {
        background: `url(${Meat}) center center / cover no-repeat`,
        width: '25px',
        height: '25px',
      },
      category2: {
        background: `url(${Break}) center center / cover no-repeat`,
        width: '23px',
        height: '23px',
      },
      category3: {
        background: `url(${Chicken}) center center / cover no-repeat`,
        width: '22px',
        height: '22px',
      },
      category4: {
        background: `url(${Dessert}) center center / cover no-repeat`,
        width: '25px',
        height: '25px',
      },
      category5: {
        background: `url(${Goat}) center center / cover no-repeat`,
        width: '25px',
        height: '25px',
      },
      // adicione as outras categorias e imagens necessárias aqui
    };
  }

  return (
    <div className="menu">
      {mealCategory.map((element, index) => {
        const category = categoryStyle[`category${index + 1}`]; // obtém o estilo da categoria com base no índice
        return (
          <section className="boxmenu" key={ index }>
            <button
              key={ index }
              type="button"
              value={ element.strCategory }
              onClick={ (event) => mealClick(event.target.value) }
              style={ category } // define o estilo do botão com base na categoria
              className="filterbutton"
              title={ element.strCategory }
            >
              {/* <span className="teste">{element.strCategory}</span> */}
            </button>
          </section>
        );
      })}
      {window.location.pathname.includes('drinks')
      && drinkCategory.map((element, i) => (
        <button
          data-testid={ `${element.strCategory}-category-filter` }
          key={ i }
          type="button"
          value={ element.strCategory }
          onClick={ (event) => drinkClick(event.target.value) }
        >
          { element.strCategory }
        </button>
      ))}
      <button
        type="button"
        onClick={ deleteAll }
        data-testid="All-category-filter"
        style={ { marginLeft: '-30px' } }
      >
        <img src={ All } alt="" />
      </button>
    </div>
  );
}

export default SearchRecipes;
