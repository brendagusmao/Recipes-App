import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

it('', () => {
  renderWithRouter(<App />);

  const senha = screen.getByTestId('password-input');
  const email = screen.getByRole('textbox');
  const btn = screen.getByRole('button', {
    name: /enter/i,
  });

  expect(senha).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(btn).toHaveAttribute('disabled');

  userEvent.type(senha, '1234567');
  userEvent.type(email, 'email@email.com');
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
  expect(localStorage.setItem).toBeCalled();
});
