import React, { Component } from "react";
import "../styles/search-style.css";
import { connect } from "react-redux";
import { fetchShipment } from "../action/index";

class Search extends Component {
  state = {
    searchVal: null,
    valid: false,
    errorMsg: "",
    errorInputClass: ""
  };

  searchFn() {
    if (this.state.valid) {
      this.props.getSearchResultById(this.state.searchVal);
    } else {
      this.setState({
        errorMsg: "ID sollte mit S beginnen und gefolgt von 4 Ziffern"
      });
      return false;
    }
  }

  getSearchVal(e) {
    let searchVal = e.target.value.toUpperCase();

    let pattern = /^[A-Za-z]{1}\d{4}$/;
    if (!pattern.test(searchVal)) {
      this.setState({
        valid: false,
        errorMsg: "ID sollte mit S beginnen und gefolgt von 4 Ziffern",
        errorInputClass: "errorInput"
      });
      return false;
    } else {
      this.setState({
        searchVal,
        valid: true,
        errorMsg: "",
        errorInputClass: "validInput"
      });
    }
  }

  clearText(e) {
    if (e.target.value.length === 0) {
      this.props.getSearchResultById();
    }
  }
  render() {
    return (
      <div className='search'>
        <div className='error'>{this.state.errorMsg}</div>
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
