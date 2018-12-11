import React, {Component} from 'react';
import './Mastery.css';

class Mastery extends Component{
  state = {
    toLookup: null,
    ChampionName: null,
    ChampionAmount: null,
  };

  componentDidMount(){
    console.log('This page');
  }

  render(){
    return (
      <div className = "Mastery">
      <h1 className = "Mastery-champion">{this.state.ChampionName}</h1>
      <p className = "Mastery-amount">{this.state.ChampionAmount}</p>
      </div>
    );
  }
}

export default Mastery;
