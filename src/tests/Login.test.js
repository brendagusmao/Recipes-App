import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Testando página de login - home', () => {
  it('Deveria renderizar a pagina como esperado', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: /login/i });
    const email = screen.getByRole('textbox', { name: /login/i });
    const senha = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveAttribute('disabled');
  });

  it(`Quando clicado no botão, caso informações de login estejam corretas, 
    manda para o localstorage e para pagina meals`, () => {
    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'setItem')
      .mockReturnValue(JSON.stringify(''));

    const { history } = renderWithRouter(<App />);

    const email = screen.getByRole('textbox', { name: /login/i });
    const senha = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.click(loginBtn);

    expect(loginBtn).toBeInTheDocument();

    userEvent.type(email, 'email@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(loginBtn);

    expect(localStorage.setItem).toHaveBeenCalledWith('user', '{"email":"email@email.com"}');

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const mealsTitle = screen.getByRole('heading', {
      name: /meals/i });
    expect(mealsTitle).toBeInTheDocument();
  });
});
