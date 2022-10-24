// import { useContext } from 'react';
// import ReceitasContext from '../context/ReceitasContext';

function Login() {
  return (
    <form>
      <label htmlFor="email">
        <input
          type="text"
          data-testid="email-input"
          name="email"
          // value={ email }
          id="email"
          // onChange={ () => {} }
        />
      </label>
      <label htmlFor="senha">
        <input
          type="password"
          name="senha"
          // value={ senha }
          id="senha"
          // onChange={ () => {} }
          data-testid="password-input"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        onClick={ () => {} }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
