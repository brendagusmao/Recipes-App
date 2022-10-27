import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const { name, dataTest, imagem, imgTest, nameTest } = props;

  return (
    <div data-testid={ dataTest }>
      <p data-testid={ nameTest }>{ name }</p>
      <img src={ imagem } alt={ name } data-testid={ imgTest } />
    </div>
  );
}

Card.propTypes = {
  dataTest: PropTypes.string,
  imagem: PropTypes.string,
  imgTest: PropTypes.string,
  name: PropTypes.string,
  nameTest: PropTypes.string,
}.isRequired;

export default Card;
