import PropTypes from 'prop-types';
// import { useState, useEffect, useMemo, useCallback } from 'react';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  return <ReceitasContext.Provider>{children}</ReceitasContext.Provider>;
}

ReceitasProvider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;

export default ReceitasProvider;
