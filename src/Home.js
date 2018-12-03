import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './Components/App.js';
import Profile from './Components/Profile.js';
import NavBar from './Components/NavBar.js';

class Home extends Component {

  render(){
    return(
      <BrowserRouter>
      <div>
        <NavBar/>
        <Switch>
          <Route path = "/" exact component={App}/>
          <Route path = "/Search/:id/summoner=:name" component = {Profile}/>
        </Switch>
        </div>
      </BrowserRouter>
    )
  }

}

export default Home;
