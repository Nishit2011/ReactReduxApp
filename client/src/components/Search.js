import React, { Component } from "react";
import "../styles/search-style.css";
import { connect } from "react-redux";
import { fetchShipment } from "../action/index";

class Search extends Component {
  state = {
    searchVal: null,
    valid: false
  };

  searchFn() {
    if (this.state.valid) {
      this.props.getSearchResultById(this.state.searchVal);
    } else {
      document.querySelector(".error").style.visibility = "visible";
      setTimeout(function() {
        document.querySelector(".error").textContent =
          "Id should start with S and followed by 4 digits";
      }, 2500);
      setTimeout(function() {
        document.querySelector(".error").style.visibility = "hidden";
      }, 6500);
      return false;
    }
  }

  getSearchVal(e) {
    let searchVal = e.target.value.toUpperCase();

    let pattern = /^[A-Za-z]{1}\d{4}$/;
    if (!pattern.test(searchVal)) {
      document.getElementById("search").style.border = "2px solid red";
      this.setState({ valid: false });
      return false;
    } else {
      this.setState({ searchVal, valid: true });
      document.getElementById("search").style.border = "2px solid green";
    }
  }

  clearText(e) {
    if (e.target.value.length === 0) {
      document.getElementById("search").style.border = "none";
      this.props.getSearchResultById();
    }
  }
  render() {
    return (
      <div className='search'>
        <div className='error'>
          ID sollte mit S beginnen und gefolgt von 4 Ziffern
        </div>
        <input
          type='text'
          placeholder='Enter Id of the shipment'
          onChange={e => this.getSearchVal(e)}
          onKeyUp={e => this.clearText(e)}
          id='search'
        />
        <button onClick={e => this.searchFn()}>Search</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { res: state.fetchShipmentReducer };
};

export default connect(mapStateToProps, { fetchShipment })(Search);
