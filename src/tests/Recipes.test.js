import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Testando página de login - home', () => {
  it('Deveria mostrar todas as categorias da pagina meals', async () => {
    const { debug } = renderWithRouter(<App />, '/meals');

    const mealsLink = screen.getByRole('link', { name: /meal icon/i });

    userEvent.click(mealsLink);

    await waitFor(() => {
      const beefButton = screen.getByRole('button', { name: /beef/i });
      const breakfastButton = screen.getByRole('button', { name: /breakfast/i });
      const chickenButton = screen.getByRole('button', { name: /chicken/i });
      const dessertButton = screen.getByRole('button', { name: /dessert/i });
      const goatButton = screen.getByRole('button', { name: /goat/i });
      const allButton = screen.getByRole('button', { name: /all/i });
      debug();
      expect(beefButton).toBeInTheDocument();
      expect(breakfastButton).toBeInTheDocument();
      expect(chickenButton).toBeInTheDocument();
      expect(dessertButton).toBeInTheDocument();
      expect(goatButton).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('Deveria mostrar 12 receitas a primeira vez que entra na página de meals', async () => {
    renderWithRouter(<App />, '/meals');

    const TWELVE_RECIPES = 12;

    const firstRecipe = screen.findByRole('img', { name: /corba/i });
    expect(firstRecipe).toBeInTheDocument();

    for (let index = 0; index < TWELVE_RECIPES; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    }
  });
});
