/* eslint-disable indent */
import React, { useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import { AiFillHeart, AiFillCloseCircle } from 'react-icons/ai';
import { IoSearchCircleSharp } from 'react-icons/io5';
// import { GrClose } from 'react-icons/gr';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import '../CSS/Header.css';

function Header({ title }) {
  const [show, setShow] = useState(false);
  // const [menuState, setMenuState] = useState('closed');

  // function toggleMenu() {
  //   setMenuState(menuState === 'closed' ? 'open' : 'closed');
  // }

  // useEffect(() => {
  //   const nav = document.querySelector('.toggle');

  //   if (menuState === 'open') {
  //     <SearchBar />;
  //   } else {
  //     nav.style.display = 'none';
  //   }
  // }, [menuState]);

  const path = window.location.pathname;

  return (
    <header className="header">
      <div className="icones">
        <a href="/profile">
          <CgMenuGridO />
        </a>
        <a href="/favorite-recipes">
          <AiFillHeart />
        </a>
      </div>
      <h1 data-testid="page-title">{title}</h1>
      {!(
        path === '/profile'
        || path === '/done-recipes'
        || path === '/favorite-recipes'
      ) && (
        <div className="buttonsearch">
          <button
            type="button"
            onClick={ () => setShow(!show || (show === false)) }
          >
            { show === false
              ? <IoSearchCircleSharp />
              : <AiFillCloseCircle
                  style={
                  { fontSize: '30px', color: 'white!important', marginRight: '5px' }
                }
              /> }
          </button>

          { show && (
            <SearchBar />)}
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
