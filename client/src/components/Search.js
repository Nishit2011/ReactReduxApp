import React, { Component } from "react";
import "../styles/search-style.css";
import { connect } from "react-redux";
import { fetchShipment } from "../action/index";

class Search extends Component {
  state = {
    searchVal: null
  };

  searchFn() {
    debugger;
    this.props.getSearchResultById(this.state.searchVal);
  }

  getSearchVal(e) {
    let searchVal = e.target.value.toUpperCase();

    this.setState({ searchVal });

    // let table = document.getElementById("resultTbl");
    // let tr = table.getElementsByTagName("tr");
    // for (let i = 0; i < tr.length; i++) {
    //   //console.log(tr[i].getElementsByTagName("td")[1]);
    //   let td = tr[i].getElementsByTagName("td")[1];
    //   if (td) {
    //     let textValue = td.textContent || td.innerText;

    //     if (textValue.toUpperCase().indexOf(searchVal) > -1) {
    //       tr[i].style.display = "";
    //     } else {
    //       tr[i].style.display = "none";

    //     }
    //   }
    // }
  }

  clearText(e) {
    if (e.target.value.length === 0) {
      this.props.getSearchResultById();
    }
  }
  render() {
    return (
      <div className='search'>
        <input
          type='text'
          placeholder='Search by ID...'
          onChange={e => this.getSearchVal(e)}
          onKeyUp={e => this.clearText(e)}
        />
        <button onClick={e => this.searchFn(this.state.searchVal)}>
          Search
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { res: state.fetchShipmentReducer };
};

export default connect(mapStateToProps, { fetchShipment })(Search);
