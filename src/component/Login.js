import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';

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
    <>
      <form>
        <label htmlFor="email">
          <input
            type="text"
            data-testid="email-input"
            name="email"
            value={ userEmail }
            id="email"
            onChange={ handleEmail }
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
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          onClick={ click }
          disabled={ !(senha.length >= minNumber && emailValid) }
        >
          Enter
        </button>
      </form>
      {redirect && <Redirect to="/meals" />}
    </>
  );
}

export default Login;
