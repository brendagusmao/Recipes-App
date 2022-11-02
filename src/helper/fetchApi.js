export const ApiIngrediente = async (ingrediente, receita) => {
  try {
    const response = await fetch(
      `https://www.${receita}.com/api/json/v1/1/filter.php?i=${ingrediente}`,
    );
    const data = await response.json();
    return data?.meals || data?.drinks;
  } catch {
    console.error();
  }
};

export const ApiName = async (nome, receita) => {
  try {
    const response = await fetch(
      `https://www.${receita}.com/api/json/v1/1/search.php?s=${nome}`,
    );
    const data = await response.json();
    return data?.meals || data?.drinks;
  } catch {
    console.error();
  }
};

export const ApiLetter = async (letter, receita) => {
  try {
    const response = await fetch(
      `https://www.${receita}.com/api/json/v1/1/search.php?f=${letter}`,
    );
    const data = await response.json();
    return data?.meals || data?.drinks;
  } catch {
    console.error();
  }
};

export const apiMeal = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  );
  const data = await response.json();
  return data.meals;
};

export const apiDrink = async () => {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  );
  const data = await response.json();
  return data.drinks;
};

export const apiCatMeal = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  );
  const data = await response.json();
  return data.meals;
};

export const apiCatDrink = async () => {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  );
  const data = await response.json();
  return data.drinks;
};

export const apiDrinkFiltro = async (evento) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${evento}`,
  );
  const data = await response.json();
  return data.drinks;
};

export const apiMealFiltro = async (evento) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${evento}`,
  );
  const data = await response.json();
  return data.meals;
};

export const apiMealId = async (receita) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${receita}`,
  );
  const data = await response.json();
  return data.meals;
};

export const apiDrinkId = async (receita) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${receita}`,
  );
  const data = await response.json();
  return data.drinks;
};
