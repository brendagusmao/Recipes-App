import PropTypes from 'prop-types';
import { useState, useMemo, useCallback } from 'react';
import ReceitasContext from './ReceitasContext';
import { ApiIngrediente, ApiName, ApiLetter } from '../helper/fetchApi';

function ReceitasProvider({ children }) {
  const [userEmail, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [busca, setBusca] = useState('');
  const [radio, setRadio] = useState('');
  const [receitas, setReceitas] = useState([]);

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleBusca = ({ target: { value } }) => {
    setBusca(value);
  };

  const handleRadio = ({ target: { value } }) => {
    setRadio(value);
  };

  const handleSenha = ({ target: { value } }) => {
    setSenha(value);
  };

  const endPoint = useCallback(async () => {
    if (window.location.pathname.includes('meals')) {
      switch (radio) {
      case 'ingrediente':
        await ApiIngrediente(busca, 'themealdb');
        setReceitas(await ApiIngrediente(busca, 'themealdb'));
        break;
      case 'nome':
        await ApiName(busca, 'themealdb');
        setReceitas(await ApiName(busca, 'themealdb'));
        break;
      case 'letter':
        if (busca.length === 1) {
          await ApiLetter(busca, 'themealdb');
          setReceitas(await ApiLetter(busca, 'themealdb'));
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        break;
      }
    } else if (window.location.pathname.includes('drinks')) {
      switch (radio) {
      case 'ingrediente':
        await ApiIngrediente(busca, 'thecocktaildb');
        setReceitas(await ApiIngrediente(busca, 'thecocktaildb'));
        break;
      case 'nome':
        await ApiName(busca, 'thecocktaildb');
        setReceitas(await ApiName(busca, 'thecocktaildb'));
        break;
      case 'letter':
        if (busca.length === 1) {
          await ApiLetter(busca, 'thecocktaildb');
          setReceitas(await ApiLetter(busca, 'thecocktaildb'));
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        break;
      }
    }
  }, [busca, radio]);

  const values = useMemo(
    () => ({
      userEmail,
      senha,
      handleEmail,
      handleSenha,
      handleRadio,
      endPoint,
      handleBusca,
      receitas,
    }),
    [userEmail, senha, endPoint, receitas],
  );

  return (
    <ReceitasContext.Provider value={ values }>
      {children}
    </ReceitasContext.Provider>
  );
}

ReceitasProvider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;

export default ReceitasProvider;
