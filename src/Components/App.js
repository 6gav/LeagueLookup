import React, { Component } from 'react';
import './App.css';

var photo;

class App extends Component {
  state = {
    toLookup: null,
  };

  componentDidMount(){

    photo = document.querySelector('.App-background');
  }

  searchSummoner = async e => {
    window.location = './Search/na/summoner=' + this.state.toLookup;
    e.preventDefault();
  };

  onMouseMove(e){

    var x = e.clientX * 30 / window.innerWidth + 10 + "%";
    var y = e.clientY * 30 / window.innerHeight + "%";
    photo.style.left = x;
    photo.style.top = y;
    photo.style.transform = "translate(-"+x+",-"+y+")";

  }

  render() {
    return (
      <div className="App" onMouseMove={this.onMouseMove.bind(this)}>
      <div className="App-background">
      </div>
        <header className="App-header">
          <form onSubmit = { this.searchSummoner } className = "Input-form" >
          <input type = "text" onChange = {e => this.setState({ toLookup: e.target.value })} placeholder="Search for a summoner..." className = "Input-field"/>
          <button type="submit" className = "Input-submit"/>
          </form>
        </header>
      </div>


    );
  }
}

export default App;
