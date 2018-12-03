import React, {Component} from 'react';
import './Profile.css';

class Profile extends Component {
  state = {
    toLookup: null,
    SummonerName: null,
    Level: null,
    isLiveGame: null,
  };

  componentDidMount(){
    console.log(this.props.match.params);
    this.state.toLookup = this.props.match.params.name;
    this.fetch();
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
      console.log('Received: ' + body.isLiveGame);
      this.setState({
        SummonerName: body.SummonerName,
        Level: body.Level,
        isLiveGame: body.isLiveGame,
      });
    }
    else {
      console.log(body.error);
    }
    console.log(this.state);
  }


  render() {
    return (
      <div className = "Profile-page">
        <header className = "Profile-header">
          <div className = "Profile-info">
          <p>Name: {this.state.SummonerName}</p>
          <p>Level: {this.state.Level}</p>
          <LiveGame isLiveGame ={this.state.isLiveGame}/>
          </div>
        </header>
      </div>
    );
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
