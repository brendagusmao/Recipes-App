import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/ReceitasProvider';
import Login from './component/Login';
import Recipes from './component/Recipes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/meals" render={ (props) => <Recipes { ...props } /> } />
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
