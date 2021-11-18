import React, { Component } from 'react';
import Map from './Map'
import Search from './Search'
import Filter from './Filter'
import Delay from './Delay'
import Weather from './Weather'
import Footer from './Footer'
import News from './News'
import '../css/App.css';
import '../css/Map.css';
import axios from 'axios'
import Table from 'react-bootstrap/Table'



const SERVER_URL = 'https://young-escarpment-93961.herokuapp.com/';

class Tripping extends Component {

  constructor() {
    super();

    this.state = {
      selectedTrain: null,
      trains: [],
      origin: null,
      destination: null
    };

    this.handleCallback = this.handleCallback.bind(this)
  };


  handleCallback(tripID) {
    this.setState({selectedTrain: tripID})
    // console.log("THIS IS PRINTING THE TRIPPING COMPONENT" + this.state.selectedTrain);
    // console.log(this.state.filteredTrains);
  }

  componentDidMount() {

    const fetchTrains = () => {
      axios(SERVER_URL).then((response) => {
        this.setState({trains: response.data});
        // console.log(this.state.trains);
        setTimeout(fetchTrains, 4000);
      });
    };

    fetchTrains();
  }


  render() {
    const{selectedTrain}=this.state;
    return (
      <div className="container">
        <header>
        <News />
        <h1 class="mainheading">Transport NSW Open Data - Realtime Dashboard</h1>
        <h4 class="instructions">Instructions:</h4>
        <Weather />
        </header>
        <hr class="horizontalline"></hr>
        <div className= 'google-map'>
          <Map trainsToMap={ this.state.trains } selectedTrain={ this.state.selectedTrain } />
        </div>
        <hr class="horizontalline"></hr>

        <aside className="search-delay-filter">
          <div className="sdf-windows">
          <Search parentCallback={ this.handleCallback } trainsToSearch={ this.state.trains }/>
          </div>
          <div className="sdf-windows">
            <Filter trainsToFilter={ this.state.trains }/>
          </div>
          <div className="sdf-windows">

          </div>
          <Footer/>
        </aside>
      </div>
    )
  }
}

//  <Delay /> <Filter />
export default Tripping;
