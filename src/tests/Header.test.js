import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';
import Meals from '../pages/Meals';

it('', async () => {
  renderWithRouter(<Meals />);
  const profile = screen.getByTestId('profile-top-btn');
  const buscar = screen.getByTestId('search-top-btn');
  const title = screen.getByRole('heading', { name: /meals/i });
  const textArea = await screen.findByTestId('search-input');

  expect(profile).toBeInTheDocument();
  expect(buscar).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  userEvent.click(buscar);
  expect(textArea).toBeInTheDocument();
});
