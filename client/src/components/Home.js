import React, { Component } from "react";
import ShipmentResult from "./ShipmentResult";
import Search from "./Search";
import "../styles/home-style.css";

class Home extends Component {
  state = {
    searchResults: [],
    searchVal: ""
  };

  searchResults = searchResult => {
    this.setState({
      searchResults: [...this.state.searchResults, ...searchResult]
    });
  };

  render() {
    return (
      <div className='home-container'>
        <ShipmentResult handleSearchResult={this.state.searchResults} />
      </div>
    );
  }
}

export default Home;
