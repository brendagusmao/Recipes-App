import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const { name, dataTest, imagem, imgTest, nameTest, onClick, onKeyDown } = props;

  return (
    <div
      data-testid={ dataTest }
      onClick={ onClick }
      role="button"
      onKeyDown={ onKeyDown }
      tabIndex={ 0 }
    >
      <p data-testid={ nameTest }>{ name }</p>
      <img src={ imagem } alt={ name } data-testid={ imgTest } />
    </div>
  );
}

Card.propTypes = {
  dataTest: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  imagem: PropTypes.string,
  imgTest: PropTypes.string,
  name: PropTypes.string,
  nameTest: PropTypes.string,
}.isRequired;

export default Card;
