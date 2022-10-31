import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import '../CSS/Login.css';
import Logo from '../images/logo.png';

function Login() {
  const { userEmail, handleEmail, senha, handleSenha } = useContext(ReceitasContext);
  const [redirect, setRedirect] = useState(false);

  const emailValid = /\S+@\S+\.\S+/.test(userEmail);
  const minNumber = 7;

  const click = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    setRedirect(true);
  };
  return (
    <div className="Login">
      <div className="Login__container">
        <div className="Header">
          <img src={ Logo } alt="avatar" />
        </div>
        <form>
          <label htmlFor="email">
            <h4> Login</h4>
            <input
              type="text"
              data-testid="email-input"
              name="email"
              value={ userEmail }
              id="email"
              onChange={ handleEmail }
              className="Login__form-input"
              placeholder=" Your e-mail"
            />
          </label>
          <label htmlFor="senha">
            <input
              type="password"
              name="senha"
              value={ senha }
              id="senha"
              onChange={ handleSenha }
              data-testid="password-input"
              className="Login__form-input"
              placeholder="Password"
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-btn"
            onClick={ click }
            disabled={ !(senha.length >= minNumber && emailValid) }
            className="Login__button"
          >
            Entrar
          </button>
        </form>
      </div>
      {redirect && <Redirect to="/meals" />}
    </div>
  );
}

export default Login;
