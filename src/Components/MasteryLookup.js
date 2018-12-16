import React, {Component} from 'react';
import './App.css';
import './MasteryLookup.css';

var championList;
var championFull;

class MasteryLookup extends Component{


  componentDidMount(){
      console.log('Mastery Page');
      this.fetchList();
  }

  async fetchList(){
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

  render(){
    return (
      <div className = "Mastery">
        <div className = "App-background">
        </div>
        <div className = "Mastery-lookup">
          <p>Test</p>
          <select id="championSelect"></select>
        </div>
      </div>
    );
  }

}

export default MasteryLookup;
