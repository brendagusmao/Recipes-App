import React from 'react';
import drinkIcon from '../images/drink2.png';
import mealIcon from '../images/meal2.png';
import '../CSS/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <a href="/drinks">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon"/>
      </a>
      <a href="/meals">
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meal icon" />
      </a>
    </footer>
  );
}

export default Footer;
