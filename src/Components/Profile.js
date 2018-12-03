import React, {Component} from 'react';

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
      this.setState({
        SummonerName: body.SummonerName,
        Level: body.Level,
        isLiveGame: body.isLiveGame,
      });
    }
    else {
      console.log(body.error)
    }
    console.log(this.state);
  }


  render() {
    return (
      <div></div>
    );
  }

}

export default Profile;
