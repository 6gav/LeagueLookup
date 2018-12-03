import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './Components/App.js';
import Profile from './Components/Profile.js';

class Home extends Component {

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path = "/" exact component={App}/>
          <Route path = "/Search/:id/summoner=:name" component = {Profile}/>
        </Switch>
      </BrowserRouter>
    )
  }

}

export default Home;
