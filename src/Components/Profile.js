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
    LiveGame: null,
    IconId: null,
    MostMastery: null,
    SoloRank: null,
    FiveRank: null,
    ThreeRank: null,
    SoloLp: null,
  };

  componentDidMount(){
    this.setState({ toLookup: this.props.match.params.name, IconId : 3232, LiveGame: null,});
    console.log(this.props.match.params);
    this.testFetch();

  }

  async testFetch(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/json');
    myHeaders.append('Access-Control-Allow-Origin', '*');

    var target = 'http://ddragonexplorer.com/cdn/8.24.1/data/en_US/championFull.json';
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
      this.setState({
        SummonerName: body.SummonerName,
        Level: body.Level,
        isLiveGame: body.isLiveGame,
        Livegame: body.LiveGame,
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
    console.log(body);
    if(this.state.isLiveGame){
    for(var i = 0; i < body.LiveGame.participants.length; i++){
      console.log(body.LiveGame.participants[i]);
      console.log(championList.keys[body.LiveGame.participants[i].championId]);
    }
    this.setState({LiveGame: body.LiveGame});
  }

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
              <div className = "Profile-Heading">
                <img className = "Profile-icon" id="profile-icon" alt="Profile_Icon"/>
                <p id = "playerLevel">{this.state.Level}</p>
                <p id = "playerName">{this.state.SummonerName}</p>
              </div>
              <div className = "Profile-Rank">
                <img className = "Profile-rank-icon" id="profile-rank" alt="Profile_Rank"/>
                <p id = "playerRank">{this.state.SoloRank}</p>
                <p id = "playerLp">{this.state.SoloLp}</p>
              </div>
            </div>
            <div className = "Matches" id = 'matches-info'>
              <div>
                <FillLiveGame LiveGame = {this.state.LiveGame}/>
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
    var icon = document.getElementById('profile-icon');
    icon.src = "http://ddragonexplorer.com/cdn/8.24.1/img/profileicon/" + props.IconId + ".png";
    icon.style.borderWidth = '0.2em';
    icon.style.fontSize = '100%';
    console.log(icon);
  }
  if(props.MostMastery){
    var champ = championList.keys[props.MostMastery];
    document.getElementById('profile-splash').style.backgroundImage = "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champ + "_0.jpg')";
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
      default:
        TempImage = Iron;
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

function FillLiveGame(props){

  console.log(props);
  if(props.LiveGame)
  {
    var elements = [];
    for(var i = 0; i < props.LiveGame.participants.length; i++)
    {
      var tempStyle={
        backgroundImage: "url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + championList.keys[props.LiveGame.participants[i].championId] + "_0.jpg)",
      }

      var iconString =  "http://ddragonexplorer.com/cdn/8.24.1/img/profileicon/" + props.LiveGame.participants[i].profileIconId + ".png";
      console.log(props.LiveGame.participants[i].profileIconId);
      elements.push(
        <div className = "Matches-card-holder">
        <img className = "Matches-card-profile" src= {iconString}/>
        <div className = "Padding-box">

        </div>
          <div  key={i} className = "Matches-card" style={tempStyle}>
            <p>{props.LiveGame.participants[i].summonerName}</p>
            <p>Champion: {championList.keys[props.LiveGame.participants[i].championId]}</p>
          </div>
        </div>
      );
    }
    return elements;
  }
  else {
    return(
      <p>Not ingame.</p>
    );
  }
}

export default Profile;
