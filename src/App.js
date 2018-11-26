import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    toLookup: null,

  };



  componentDidMount(){
    this.callDefaultInfo()
      .then(res => this.setState({ data: res.default }))
      .catch(err => console.log(err));
  }

  callDefaultInfo = async() => {
    const response = await fetch('/static_info');
    const body = await response.json();

    return body;
  };

  searchSummoner = async e => {
    e.preventDefault();
    const response = await fetch('/summoner_lookup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post: this.state.toLookup }),
    });
    const body = await response.json();

    console.log(body);

  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit = {this.searchSummoner}>

          <p>
            {this.state.data}
          </p>
          <input
            type = "text"
            onChange = {e => this.setState({ toLookup: e.target.value })}/>
          <button type="submit">Search</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
