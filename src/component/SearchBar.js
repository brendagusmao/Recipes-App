import React, { useContext } from 'react';
import { IoSearch } from 'react-icons/io5';
import ReceitasContext from '../context/ReceitasContext';
import '../CSS/SearchBar.css';

function Recipes() {
  const { handleRadio, endPoint, busca, handleBusca } = useContext(ReceitasContext);
  return (
    <main className="sectionbar">
      <label htmlFor="busca">
        <IoSearch className="icon" />
        <input
          type="text"
          name="busca"
          value={ busca }
          data-testid="search-input"
          id="busca"
          onChange={ handleBusca }
          className="inputlabel"
        />
      </label>
      <section className="filter">
        <h2> Filter:</h2>
        <label htmlFor="ingrediente">
          Ingredient:
          <input
            type="radio"
            name="ingrediente"
            id="ingrediente"
            value="ingrediente"
            data-testid="ingredient-search-radio"
            onChange={ handleRadio }
            className="inputradio"
          />
        </label>
        <p />
        <label htmlFor="nome">
          Nome:
          <input
            type="radio"
            name="nome"
            id="nome"
            value="nome"
            data-testid="name-search-radio"
            onChange={ handleRadio }
            className="inputradio"
          />
        </label>
        <p />
        <label htmlFor="letter">
          Primeira letra:
          <input
            type="radio"
            name="letter"
            id="letter"
            value="letter"
            data-testid="first-letter-search-radio"
            onChange={ handleRadio }
            className="inputradio"
          />
        </label>
      </section>
      <div className="buttonss">
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ endPoint }
        >
          Pesquisar
        </button>
      </div>
    </main>
  );
}

export default Recipes;
