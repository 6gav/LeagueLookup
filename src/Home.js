import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Search from './Components/Search.js';
import Profile from './Components/Profile.js';
import NavBar from './Components/NavBar.js';
import MasteryLookup from './Components/MasteryLookup.js';
import Mastery from './Components/Mastery.js';

class Home extends Component {

  render(){
    return(
      <BrowserRouter>
      <div>
        <NavBar/>
        <Switch>
          <Route path = "/" exact component={Search}/>
          <Route path = "/Search/:id/summoner=:name" component = {Profile}/>
          <Route path = "/Mastery" component = {MasteryLookup}/>
          <Route path = "/Mastery/:id/summoner=:name/champion=:champion" component = {Mastery}/>
        </Switch>
      </div>
      </BrowserRouter>
    )
  }

}

export default Home;
