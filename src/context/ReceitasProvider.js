import PropTypes from 'prop-types';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReceitasContext from './ReceitasContext';
import { ApiIngrediente,
  ApiName,
  ApiLetter,
  apiMeal,
  apiDrink } from '../helper/fetchApi';

function ReceitasProvider({ children }) {
  const history = useHistory();
  const [userEmail, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [busca, setBusca] = useState('');
  const [radio, setRadio] = useState('');
  const [receitas, setReceitas] = useState([]);
  const [meal, setMeal] = useState([]);
  const [drink, setDrink] = useState([]);

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

  const handleLogout = useCallback(() => {
    localStorage.clear();
    history.push('/');
  }, [history]);

  const endPoint = useCallback(async () => {
    if (receitas?.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      // setReceitas([]);
    }
    if (window.location.pathname.includes('meals')) {
      switch (radio) {
      case 'ingrediente':

        setReceitas(await ApiIngrediente(busca, 'themealdb'));
        break;
      case 'nome':

        setReceitas(await ApiName(busca, 'themealdb'));
        break;
      case 'letter':
        if (busca.length === 1) {
 
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
        // await ApiIngrediente(busca, 'thecocktaildb');
        setReceitas(await ApiIngrediente(busca, 'thecocktaildb'));
        break;
      case 'nome':
 
        setReceitas(await ApiName(busca, 'thecocktaildb'));
        break;
      case 'letter':
        if (busca.length === 1) {
         
          setReceitas(await ApiLetter(busca, 'thecocktaildb'));
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        break;
      }
    }
   
    console.log(receitas);
  }, [busca, radio, receitas]);

  useEffect(() => {
    const api = async () => {
      if (window.location.pathname.includes('/meals')) {
        const getMeal = await apiMeal();
        setMeal(getMeal.slice(0, +'12'));
      } else if (window.location.pathname.includes('/drinks')) {
        const getDrink = await apiDrink();
        setDrink(getDrink.slice(0, +'12'));
      }
    };
    api();
  }, []);

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
      handleLogout,
      meal,
      drink,
    }),
    [userEmail, senha, endPoint, receitas, handleLogout, drink, meal],
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
