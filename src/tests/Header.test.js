import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

it('', () => {
  renderWithRouter(<App />, '/meals');

  const profile = screen.getByTestId('profile-top-btn');
  const buscar = screen.getByTestId('search-top-btn');
  const title = screen.getByRole('heading', { name: /meals/i });

  expect(profile).toBeInTheDocument();
  expect(buscar).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  userEvent.click(buscar);

  const textArea = screen.getByTestId('search-input');

  expect(textArea).toBeInTheDocument();
});
