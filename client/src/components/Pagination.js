import React, { Component } from "react";
import "../styles/shipment-result-style.css";
class Pagination extends Component {
  state = {
    currentPage: 1,
    totalPages: 1
  };

  createPaginationMarkers() {
    // const totalElems = this.props.res.length;
    // const elemsPerPage = 20;
    // const page = 1;
    // let totalPages = Math.ceil(totalElems / elemsPerPage);
    // let paginationMarkers = "";
    // for (let i = 1; i <= totalPages; i++) {
    //   paginationMarkers += `<a href='#' id=${i} onClick={this.triggerPagination(${i})}>${i}</a>`;
    // }
    // console.log(paginationMarkers);
    // if (totalPages > 1) {
    //   document.getElementById("paginationMarker").innerHTML = paginationMarkers;
    // } else {
    //   document.getElementById(
    //     "paginationMarker"
    //   ).innerHTML = `<a href='#'>${1}</a>`;
    // }
    // this.props.fetchShipments(20, 1);
  }

  //   triggerPagination(pageNumber) {
  //     this.props.fetchShipments(20, pageNumber);
  //   }

  handlePagination = e => {
    e.preventDefault();

    if (e.target.id === "prev") {
      this.setState(
        prevState => {
          return { currentPage: prevState.currentPage - 1 };
        },
        () =>
          this.props.onSelectPageNumber(
            this.state.currentPage,
            this.state.totalPages
          )
      );
    } else {
      this.setState(
        prevState => {
          return { currentPage: prevState.currentPage + 1 };
        },
        () =>
          this.props.onSelectPageNumber(
            this.state.currentPage,
            this.state.totalPages
          )
      );
    }
  };

  render() {
    return (
      <div className='pagination'>
        {" "}
        <a href='#' id='prev' onClick={e => this.handlePagination(e)}>
          Previous
        </a>
        {/* {this.props.res.length > 0 ? this.createPaginationMarkers() : ""} */}
        {/* <div id='paginationMarker'></div> */}
        <a href='#' id='next' onClick={e => this.handlePagination(e)}>
          Next
        </a>
      </div>
    );
  }
}

export default Pagination;
