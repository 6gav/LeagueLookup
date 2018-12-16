import React, {Component} from 'react';
import './NavBar.css';

class NavBar extends Component {
  redirect(){
    window.location = window.location.origin;
  }

  masteryRedirect(){
    window.location = window.location.origin + "/mastery";
  }

  render(){
    return (
      <div className="NavBar">
        <button className="NavButton" onClick= {this.redirect} >Home</button>
        <button className="NavButton" onClick= {this.masteryRedirect}>Mastery Lookup</button>
      </div>
    );
  }
}
export default NavBar;
