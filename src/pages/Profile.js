import React, { useContext } from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import ReceitasContext from '../context/ReceitasContext';
import '../CSS/Profile.css';

function Profile() {
  const { handleLogout } = useContext(ReceitasContext);
  const email = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="containerrecipes">
      <Header title="Profile" />
      <div className="cardDetails">
        <section className="main">
          <p />
          <p />
        <Footer />
        <p />
          <p />
          <p data-testid="profile-email">
            Email:
            {' '}
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
            className="buttomlogo"
          >
            Logout
          </button>
        </section>
      </div>
    </div>
  );
}

export default Profile;
