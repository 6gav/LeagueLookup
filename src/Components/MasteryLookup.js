import React, {Component} from 'react';
import './App.css';
import './MasteryLookup.css';

var championList;
var championFull;
let myHeaders = new Headers();

var APIKey = 'RGAPI-ea4b224c-8157-409f-b904-81f19360c436';

class MasteryLookup extends Component{
  state = {
    champion: 'Aatrox',
    toLookup: null,
    masteryScore: null,
  }

  componentDidMount(){
      console.log('Mastery Page');
      this.fetchList();
      myHeaders.append('Content-Type', 'text/json');
      myHeaders.append('Access-Control-Allow-Origin', '*');
  }

  async fetchList(){

    var target = 'http://ddragonexplorer.com/cdn/8.24.1/data/en_US/championFull.json';
      fetch(target, {
        headers: myHeaders,
    })
    .then(response => response.json())
    .then(data => {
      championList = data;
      console.log('Fetched: ');
      console.log(championList);
      championFull = Object.keys(championList.data);
      console.log(championFull);
      this.fillItems();
    })
    .catch(e => {
      console.log(e);
    });
  }

  fillItems(){
    var select = document.getElementById("championSelect");
    for(var i = 0; i < championFull.length; i++){
      var option = document.createElement("option");
      option.text = championFull[i];
      option.value = championFull[i];
      select.appendChild(option);
    }
  }

  async searchMastery() {
    console.log('Start of mastery search');
    console.log(championList.data['Vayne'].key);

    const response = await fetch('/mastery_lookup', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({ toLookup: this.state.toLookup, champion: championList.data[this.state.champion].key }),
    });
    const body = await response.json();
    if(!body.error){
      this.setState({

        masteryScore: body.MasteryAmount,
      })
    }
    else {
      console.log('failed');
    }
    console.log('End of search');

  }


  submit = async e => {
    e.preventDefault();
    console.log(this.state);
    if(this.state.toLookup && this.state.champion){
      this.searchMastery();
    }

  }

  changeInfo(props){
    console.log(props);
    this.setState({champion: props}, () => {
      var tempBack = "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.state.champion + "_0.jpg')";
      console.log(tempBack);
      document.getElementById('App-background').style.backgroundImage = tempBack;

    });
  }

  render(){
    return (
      <div className = "Mastery" id = "App-background">
        <div className = "App-background">
        </div>
        <div className = "Mastery-lookup" >
          <form onSubmit = { this.submit } className = "Input-form">
          <input type="text" onChange = {e => this.setState({toLookup: e.target.value})} className = "Input-field" placeholder="Search for a summoner..."/>
          <select id="championSelect" onChange = {e => this.changeInfo(e.target.value)} className = "Input-champion"/>
          <button type="submit" className = "Input-submit"/>

          </form>
        </div>
        <Mastery amount= {this.state.masteryScore} champion = {this.state.champion}/>
      </div>
    );
  }

}

function Mastery(props) {
  if(props.amount)
  return (<p className = "Mastery-amount">Mastery on {props.champion}: {props.amount}</p>);
  else {
    return (<p></p>)
  }
}

export default MasteryLookup;
