import React /* { useState, useRef } */ from 'react';
// import { BsFillSuitHeartFill } from 'react-icons/bs';
// import drinkIcon from '../images/drinkIcon.svg';
// import mealIcon from '../images/mealIcon.svg';
import '../CSS/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <a href="/drinks">
        drinks
        {/* <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon" /> */}
      </a>
      <a href="/meals" className="active">
        meals
        {/* <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meal icon" /> */}
      </a>
    </footer>
  );
}

export default Footer;
