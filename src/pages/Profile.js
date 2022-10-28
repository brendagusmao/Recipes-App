import React, { useContext } from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import ReceitasContext from '../context/ReceitasContext';

function Profile() {
  const { handleLogout } = useContext(ReceitasContext);
  const email = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header title="Profile" />
      <p data-testid="profile-email">
        { email && email.email }
      </p>
      <a
        href="/done-recipes"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </a>
      <a
        href="/favorite-recipes"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </a>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
