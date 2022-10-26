export const ApiIngrediente = async (ingrediente, receita) => {
  const response = await fetch(`https://www.${receita}.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  return data?.meals || data?.drinks;
};

export const ApiName = async (nome, receita) => {
  const response = await fetch(`https://www.${receita}.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  return data?.meals || data?.drinks;
};

export const ApiLetter = async (letter, receita) => {
  const response = await fetch(`https://www.${receita}.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data?.meals || data?.drinks;
};
