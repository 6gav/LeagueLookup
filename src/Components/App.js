import React, { Component } from 'react';
import './App.css';
import {Redirect} from 'react-router-dom';



class App extends Component {
  state = {
    toLookup: null,
  };


  componentDidMount(){

  }

  searchSummoner = async e => {
    window.location = './Search/na/summoner=' + this.state.toLookup;
    e.preventDefault();


  };



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit = { this.searchSummoner } className = "Input-form" >
          <input type = "text" onChange = {e => this.setState({ toLookup: e.target.value })} placeholder="Search for a summoner..." className = "Input-field"/>
          <button type="submit" className = "Input-submit"/>
          </form>
          <LiveGame isLiveGame = {this.state.isLiveGame}/>
        </header>
      </div>
    );
  }
}

function LiveGame(props) {
  console.log(props.isLiveGame);
  if(props.isLiveGame != null)
    return <p>InGame: {props.isLiveGame.toString()}</p>
    else {
      return <p></p>
    }
  }

export default App;
