import React, {Component} from 'react';
import './NavBar.css';

class NavBar extends Component {
  redirect(){
    window.location.replace(window.location.origin);
  }

  render(){
    return (
      <div className="NavBar">
        <button className="NavButton" onClick= {this.redirect} >Home</button>
      </div>
    );
  }
}
export default NavBar;
