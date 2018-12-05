const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = 'RGAPI-638f24e6-d6a2-4687-96fe-d8ec082e0517';

var SummonerName;
var Level;
var TotalMastery;
var IconId;
var isLiveGame;


app.get('/static_info', (req, res) => {
  res.send({default: 'Test',})
});


app.post('/summoner_lookup', (req, res) => {
  console.log(req.body);
  axios.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + req.body.toLookup + '?api_key=' + apiKey)
  .then(resL => {
    console.log(resL.data);
    SummonerName = resL.data.name;
    Level = resL.data.summonerLevel;
    IconId = resL.data.profileIconId;
    console.log("I got id: " + IconId);
    axios.get('https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/' + resL.data.id + '?api_key=' + apiKey)
    .then(masteryResult => {
      console.log(masteryResult.data[0].championId);
      MostMastery = masteryResult.data[0].championId;

      axios.get('https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/' + resL.data.id + '?api_key=' + apiKey)
      .then(liveResult => {
        console.log(liveResult.data);
        isLiveGame = true;
          sendData(res);
      })
      .catch(e => {
        console.log(e.response.status);
          isLiveGame = false;
          sendData(res);
        console.log(`isLiveGame: ${isLiveGame}`);
      })
  })
  })
  .catch(e =>
  {
    console.log(e.response.statusText);
    res.send({error: e.response.statusText});
  });
});

 function sendData(props){
  props.send({
    SummonerName: SummonerName,
    Level: Level,
    IconId: IconId,
    isLiveGame: isLiveGame,
    MostMastery: MostMastery,
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
