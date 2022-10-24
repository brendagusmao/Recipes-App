import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  const [userEmail, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSenha = ({ target: { value } }) => {
    setSenha(value);
  };

  const values = useMemo(() => (
    { userEmail,
      senha,
      handleEmail,
      handleSenha,
    }), [userEmail,
    senha,
  ]);

  return <ReceitasContext.Provider value={ values }>{children}</ReceitasContext.Provider>;
}

ReceitasProvider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;

export default ReceitasProvider;
