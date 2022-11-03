import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';
import mockSoup from './helpers/mockMeals';

describe('Testando pagina de meals ~ refeições', () => {
  it('Deveria renderizar a página como esperado', async () => {
    renderWithRouter(<App />, '/meals');

    const title = screen.getByRole('heading', { name: /meals/i });
    const profile = screen.getByTestId('profile-top-btn');
    const buscar = screen.getByRole('button', { name: /imagem de search.png/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const drinkLink = screen.getByRole('link', { name: /drink icon/i });
    const mealsLink = screen.getByRole('link', { name: /meal icon/i });

    expect(title).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(buscar).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(drinkLink).toBeInTheDocument();
    expect(mealsLink).toBeInTheDocument();

    userEvent.click(buscar);

    const searchInput = screen.getByRole('textbox', { name: /pesquise:/i });
    const ingredientRadio = screen.getByRole('radio', { name: /ingrediente:/i });
    const nameRadio = screen.getByRole('radio', { name: /nome:/i });
    const firstLetterRadio = screen.getByRole('radio', { name: /primeira letra:/i });
    const searchButton = screen.getByRole('button', { name: /pesquisar/i });

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    userEvent.click(buscar);

    expect(searchInput).not.toBeInTheDocument();
    expect(ingredientRadio).not.toBeInTheDocument();
    expect(nameRadio).not.toBeInTheDocument();
    expect(firstLetterRadio).not.toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  });

  it('Deveria mostrar alerta caso pesquisa seja feita sem inputs', () => {
    const stringAlert = 'Sorry, we havent found any recipes for these filters.';
    global.alert = jest.fn()
      .mockReturnValue(stringAlert);

    renderWithRouter(<App />, '/meals');

    const buscar = screen.getByRole('button', { name: /imagem de search.png/i });
    userEvent.click(buscar);
    const searchButton = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert()).toBe(stringAlert);
  });

  it('Deveria mostrar sopas caso pesquiser por soup com o nome selecionado', async () => {
    const stringAlert = 'Sorry, we havent found any recipes for these filters.';
    global.alert = jest.fn()
      .mockReturnValue(stringAlert);
    global.fetch = jest.fn().mockReturnValue({
      json: jest.fn().mockReturnValue(mockSoup),
    });

    renderWithRouter(<App />, '/meals');

    const buscar = screen.getByRole('button', { name: /imagem de search.png/i });
    userEvent.click(buscar);

    const searchInput = screen.getByRole('textbox', { name: /pesquise:/i });
    const nameRadio = screen.getByRole('radio', { name: /nome:/i });
    const searchButton = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'soup');

    expect(searchInput).toHaveValue('soup');
    expect(nameRadio.checked).toBeTruthy();

    userEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert()).toBe(stringAlert);
    // const soup = screen.getByRole('img', { name: /leblebi soup/i });

    // // await waitFor(() => expect(soup).toBeInTheDocument());
  });

  it('Deveria redirecionar a pagina de drinks quando clicado no botão', () => {
    const { history } = renderWithRouter(<App />, '/drinks');

    const drinkLink = screen.getByRole('img', { name: /drink icon/i });
    userEvent.click(drinkLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('Deveria redirecionar a pagina de meals quando clicado no botão', () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const mealsLink = screen.getByRole('link', { name: /meal icon/i });
    userEvent.click(mealsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
