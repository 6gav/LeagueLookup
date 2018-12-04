import React, {Component} from 'react';
import './Profile.css';

var championList;

class Profile extends Component {
  state = {
    toLookup: null,
    SummonerName: null,
    Level: null,
    isLiveGame: null,
    IconId: null,
  };

  componentDidMount(){
    this.testFetch();
    console.log(this.props.match.params);
    this.state.IconId = 3232;
    this.state.toLookup = this.props.match.params.name;
    this.fetch();
  }

  async testFetch(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/json');
    myHeaders.append('Access-Control-Allow-Origin', '*');

    var proxy = 'https://cors-anywhere.herokuapp.com/',
        target = 'http://ddragonexplorer.com/cdn/8.24.1/data/en_US/championFull.json';
      fetch(proxy + target, {
        headers: myHeaders,
    })
    .then(response => response.json())
    .then(data => {
      championList = data;
      console.log('Fetched: ');
      console.log(championList);
    })
    .catch(e => {
      console.log(e);
    });
  }

  async fetch(){
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
      console.log('Received: ' + body.IconId);
      this.setState({
        SummonerName: body.SummonerName,
        Level: body.Level,
        isLiveGame: body.isLiveGame,
        IconId: body.IconId,
      });
    }
    else {
      console.log(body.error);
    }
    console.log(this.state);
    ProfileImage(this.state.IconId);
  }


  render() {
    return (
      <div className = "Profile-page">
        <header className = "Profile-header">
          <div className = "Profile-info">
          <img id="profile-icon"/>
          <p>Name: {this.state.SummonerName}</p>
          <p>Level: {this.state.Level}</p>
          <LiveGame isLiveGame ={this.state.isLiveGame}/>
          </div>
        </header>
      </div>
    );
  }

}

function ProfileImage(props){
  console.log("Entered image function, id is: " + props);
  if(props)
  {
    var icon = document.getElementById('profile-icon').src = "http://ddragonexplorer.com/cdn/8.24.1/img/profileicon/" + props + ".png"
    console.log(icon);
  }
}

function LiveGame(props){
  if(props.isLiveGame != null)
  return <p>InGame: {props.isLiveGame.toString()}</p>
  else {
    return <p>InGame: false</p>
  }
}

export default Profile;
