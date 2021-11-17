import React, { Component } from 'react';
import Map from './Map'
import Search from './Search'
import Filter from './Filter'
import Delay from './Delay'
import Weather from './Weather'
import News from './News'
import '../css/App.css';
import axios from 'axios'


const SERVER_URL = 'https://young-escarpment-93961.herokuapp.com/';

class Tripping extends Component {

  constructor() {
  super();
  // this.state ={trains: []};
  this.state = {
    selectedTrain: null,
    trains: []
  };
  this.handleCallback = this.handleCallback.bind(this)
};


  handleCallback(childData) {
    this.setState({selectedTrain: childData})
    // console.log("THIS IS PRINTING THE TRIPPING COMPONENT" + this.state.selectedTrain);
    console.log(this.state.filteredTrains);
  }


  componentDidMount() {
  const fetchTrains = () => {
    axios(SERVER_URL).then((response) => {
      this.setState({trains: response.data});
      // console.log(this.state.trains);
      setTimeout(fetchTrains, 200);
    });

  };

  fetchTrains();
}



  render() {
    const{data}=this.state;
    return (
      <div className="container">
        <header>
        <News />
        <div className="logo">
        <img  src="/images/logo.png"  alt="logo" width="100" />
        <Weather />
        </div>
        </header>
        <div className= 'google-map'>
          <Map trainsToMap={this.state.trains} selectedTrain={this.state.selectedTrain} />
        </div>

        <aside className="search-delay-filter">
          <div className="sdf-windows">
          <Search parentCallback={this.handleCallback} trainsToSearch={this.state.trains}/>
          </div>
          <div className="sdf-windows">
          <Delay />
          </div>
          <div className="sdf-windows">
          <Filter />
          </div>
        </aside>
      </div>
    )
  }
}

export default Tripping;
