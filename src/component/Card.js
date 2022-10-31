import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/Card.css';

function Card(props) {
  const { name, dataTest, imagem, imgTest, nameTest, onClick, onKeyDown } = props;

  return (
    <div
      data-testid={ dataTest }
      onClick={ onClick }
      role="button"
      onKeyDown={ onKeyDown }
      tabIndex={ 0 }
      className="card"
    >
      <p data-testid={ nameTest } className="cardtitle">{ name }</p>
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
