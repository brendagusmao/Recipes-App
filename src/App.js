import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/ReceitasProvider';
import Login from './component/Login';
import Recipes from './pages/Recipes';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/meals" render={ (props) => <Meals { ...props } /> } />
        <Route
          exact
          path="/drinks"
          render={ (props) => <Drinks { ...props } /> }
        />
        <Route
          exact
          path="/meals/:id-da-receita"
          render={ (props) => <Recipes { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id-da-receita"
          render={ (props) => <Recipes { ...props } /> }
        />
        <Route
          exact
          path="/meals/:id-da-receita/in-progress"
          render={ (props) => <Recipes { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id-da-receita/in-progress"
          render={ (props) => <Recipes { ...props } /> }
        />
        <Route
          exact
          path="/profile"
          render={ (props) => <Profile { ...props } /> }
        />
        <Route
          exact
          path="/done-recipes"
          render={ (props) => <DoneRecipes { ...props } /> }
        />
        <Route
          exact
          path="/favorite-recipes"
          render={ (props) => <FavoriteRecipes { ...props } /> }
        />
        {/* <div className="meals">
        <span className="logo">TRYBE</span>
        <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
          Glass
        </object>
      </div> */}
        Trybe
      </Switch>
    </Provider>
  );
}

export default App;
