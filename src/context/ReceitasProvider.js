import PropTypes from 'prop-types';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReceitasContext from './ReceitasContext';
import { ApiIngrediente,
  ApiName,
  ApiLetter,
  apiMeal,
  apiDrink,
  apiCatDrink,
  apiCatMeal,
  apiDrinkFiltro,
  apiMealFiltro } from '../helper/fetchApi';

function ReceitasProvider({ children }) {
  const history = useHistory();
  const [userEmail, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [busca, setBusca] = useState('');
  const [radio, setRadio] = useState('');
  const [receitas, setReceitas] = useState([]);
  const [meal, setMeal] = useState([]);
  const [drink, setDrink] = useState([]);
  const [renderiza, setRenderiza] = useState(true);
  const [drinkCategory, setDrinkCat] = useState([]);
  const [mealCategory, setMealCat] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [mealInitial, setMealIniti] = useState([]);
  const [drinkIitial, setDrinkIniti] = useState([]);
  const [click, setCLick] = useState('');
  const [done, setDone] = useState([]);
  const [continua, setContinua] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [usado, setUsado] = useState([]);

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleCheckbox = useCallback(({ target }, selecionado) => {
    if (target.checked) {
      target.parentNode.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    } else {
      target.parentNode.style.textDecoration = '';
    }

    let newUsado = usado
      ?.filter((e) => e !== selecionado);
    if (newUsado?.length === usado?.length) {
      newUsado = [...usado, selecionado];
    }
    setUsado([...newUsado]);
  }, [usado]);

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

  useEffect(() => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipe) {
      localStorage.setItem('doneRecipes', JSON.stringify(done));
    } else {
      setDone(doneRecipe);
    }
    const continueRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!continueRecipe) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(continua));
    } else {
      setContinua(continueRecipe);
    }
    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipe) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    } else {
      setFavorite(favoriteRecipe);
    }
  }, []);

  const endPoint = useCallback(async () => {
    if (receitas?.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setRenderiza(true);
    }
    if (window.location.pathname.includes('meals')) {
      switch (radio) {
      case 'ingrediente':
        setReceitas(await ApiIngrediente(busca, 'themealdb'));
        setRenderiza(false);
        break;
      case 'nome':
        setReceitas(await ApiName(busca, 'themealdb'));
        setRenderiza(false);
        break;
      case 'letter':
        if (busca.length === 1) {
          setReceitas(await ApiLetter(busca, 'themealdb'));
          setRenderiza(false);
        } else {
          global.alert('Your search must have only 1 (one) character');
          setRenderiza(true);
        }
        break;
      default:
        break;
      }
    } else if (window.location.pathname.includes('drinks')) {
      switch (radio) {
      case 'ingrediente':
        setReceitas(await ApiIngrediente(busca, 'thecocktaildb'));
        setRenderiza(false);
        break;
      case 'nome':
        setReceitas(await ApiName(busca, 'thecocktaildb'));
        setRenderiza(false);
        break;
      case 'letter':
        if (busca.length === 1) {
          setReceitas(await ApiLetter(busca, 'thecocktaildb'));
          setRenderiza(false);
        } else {
          global.alert('Your search must have only 1 (one) character');
          setRenderiza(true);
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
        const getCatMeal = await apiCatMeal();
        setMeal(getMeal.slice(0, +'12'));
        setMealIniti(getMeal.slice(0, +'12'));
        setMealCat(getCatMeal.slice(0, +'5'));
      } else if (window.location.pathname.includes('/drinks')) {
        const getDrink = await apiDrink();
        const getCatDrink = await apiCatDrink();
        setDrink(getDrink.slice(0, +'12'));
        setDrinkIniti(getDrink.slice(0, +'12'));
        setDrinkCat(getCatDrink.slice(0, +'5'));
      }
    };
    api();
  }, []);

  const drinkClick = useCallback(async (evento) => {
    if (click === evento) {
      setFiltro(drinkIitial);
    } else {
      const drinkFilter = await apiDrinkFiltro(evento);
      setFiltro(drinkFilter.slice(0, +'12'));
      setCLick(evento);
    }
  }, [click, drinkIitial]);

  const mealClick = useCallback(async (evento) => {
    if (click === evento) {
      setFiltro(mealInitial);
    } else {
      const mealFilter = await apiMealFiltro(evento);
      setFiltro(mealFilter.slice(0, +'12'));
      setCLick(evento);
      console.log(filtro);
    }
  }, [filtro, click, mealInitial]);

  const deleteAll = useCallback(() => {
    setFiltro([]);
    console.log(filtro);
  }, [filtro]);

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
      renderiza,
      mealCategory,
      drinkCategory,
      mealClick,
      drinkClick,
      filtro,
      deleteAll,
      done,
      continua,
      favorite,
      setFavorite,
      handleCheckbox,
      usado,
    }),
    [userEmail,
      senha,
      endPoint,
      receitas,
      handleLogout,
      drink,
      meal,
      renderiza,
      mealCategory,
      drinkCategory,
      filtro,
      deleteAll,
      mealClick,
      drinkClick,
      done,
      continua,
      favorite,
      usado,
      handleCheckbox],
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
