import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Testado página de perfil ~ profile', () => {
  it('Deveria mostrar email do usuaro do localStorage', () => {
    const user = { email: 'email@email.com' };

    localStorage.setItem('user', JSON.stringify(user));

    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(user));

    renderWithRouter(<App />, '/profile');

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalledWith('user');

    const userEmail = screen.getByText(/email: email@email\.com/i);
    expect(userEmail).toBeInTheDocument();
  });
});
