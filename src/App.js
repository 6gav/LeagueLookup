import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  state = {
    toLookup: null,
    SummonerName: null,
    Level: null,
    isLiveGame: null,
  };



  componentDidMount(){

  }

  searchSummoner = async e => {
    e.preventDefault();
    console.log(this.state);
    const response = await fetch('/summoner_lookup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ toLookup: this.state.toLookup }),
    });
    const body = await response.json();
    if(!body.error)
    {
      this.setState({
        SummonerName: body.SummonerName,
        Level: body.Level,
        isLiveGame: body.isLiveGame,
      });
    }
    else {
      console.log(body.error)
    }

  };



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit = {this.searchSummoner}>
          <p>Enter a Summoner:</p>
          <input
            type = "text"
            onChange = {e => this.setState({ toLookup: e.target.value })}/>
            <p></p>
          <button type="submit">{"\n"}Search</button>
          </form>
          <p>Name: {this.state.SummonerName}</p>
          <p>Level: {this.state.Level}</p>
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
