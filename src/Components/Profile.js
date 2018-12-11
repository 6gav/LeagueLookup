import React, {Component} from 'react';
import './Profile.css';
import Iron from '../iron.png';
import Bronze from '../bronze.png';
import Silver from '../silver.png';
import Gold from '../gold.png';
import Platinum from '../platinum.png';
import Diamond from '../diamond.png';
import Master from '../master.png';
import Grandmaster from '../grandmaster.png';

var championList;

class Profile extends Component {
  state = {
    toLookup: null,
    SummonerName: null,
    Level: null,
    isLiveGame: null,
    IconId: null,
    MostMastery: null,
    SoloRank: null,
    FiveRank: null,
    ThreeRank: null,
    SoloLp: null,
  };

  componentDidMount(){
    this.state.toLookup = this.props.match.params.name;
    console.log(this.props.match.params);
    this.state.IconId = 3232;
    this.testFetch();

  }

  async testFetch(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/json');
    myHeaders.append('Access-Control-Allow-Origin', '*');

    var proxy = 'https://cors-anywhere.herokuapp.com/',
        target = 'http://ddragonexplorer.com/cdn/8.24.1/data/en_US/championFull.json';
      fetch(target, {
        headers: myHeaders,
    })
    .then(response => response.json())
    .then(data => {
      championList = data;
      console.log('Fetched: ');
      console.log(championList);
      this.fetch();
    })
    .catch(e => {
      console.log(e);
    });


  }

  async fetch(){
    console.log('Start of fetch');
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
      console.log('Received: ' + body.SoloRank);
      this.setState({
        SummonerName: body.SummonerName,
        Level: body.Level,
        isLiveGame: body.isLiveGame,
        IconId: body.IconId,
        MostMastery: body.MostMastery,
        SoloRank: body.SoloRank,
        ThreeRank: body.ThreeRank,
        FiveRank: body.FiveRank,
      });
    }
    else {
      console.log(body.error);
    }
    console.log(this.state);
    var temp = this.state.SoloRank.split(' ')[0].toLowerCase();
    ProfileUpdate({IconId: this.state.IconId, MostMastery: this.state.MostMastery, SoloRank: temp});

  }


  render() {
    return (

      <div className = "Profile-page">
      <div className = "Profile-background">
      </div>
        <header className = "Profile-header">
          <div className = "Profile-info" id="profile-splash">
          <img className = "Personal-background"/>
          <div className = "Profile-Heading">
          <img className = "Profile-icon" id="profile-icon"/>
          <p id = "playerLevel">{this.state.Level}</p>
          <p id = "playerName">{this.state.SummonerName}</p>
          </div>
          <div className = "Profile-Rank">
          <img className = "Profile-rank-icon" id="profile-rank"/>
          <p id = "playerRank">{this.state.SoloRank}</p>
          <p id = "playerLp">{this.state.SoloLp}</p>
          </div>
          </div>
        </header>
      </div>
    );
  }

}

function ProfileUpdate(props){
  console.log("Entered image function, id is: " + props);
  if(props.IconId)
  {
    var icon = document.getElementById('profile-icon').src = "http://ddragonexplorer.com/cdn/8.24.1/img/profileicon/" + props.IconId + ".png"
    console.log(icon);
  }
  if(props.MostMastery){
    var champ = championList.keys[props.MostMastery];
    var icon = document.getElementById('profile-splash').style.backgroundImage = "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champ + "_0.jpg')";
  }
  if(props.SoloRank){
    var TempImage;
    switch(props.SoloRank){
      case 'iron':
        TempImage = Iron;
      break;
      case 'bronze':
        TempImage = Bronze;
      break;
      case 'silver':
        TempImage = Silver;
      break;
      case 'gold':
        TempImage = Gold;
      break;
      case 'platinum':
        TempImage = Platinum;
      break;
      case 'diamond':
        TempImage = Diamond;
      break;
      case 'master':
        TempImage = Master;
      break;
      case 'grandmaster':
        TempImage = Grandmaster;
      break;

    }

    document.getElementById('profile-rank').src = TempImage;
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
