import React, { Component } from "react";
import "../styles/shipment-result-style.css";
class Pagination extends Component {
  state = {
    currentPage: 1,
    totalPages: 1
  };

  triggerPage(e) {
    e.preventDefault();
    const pageNumber = document.querySelector("#currentPageId").textContent;
    this.props.onSelectPageNumber(pageNumber);
  }

  handlePagination = e => {
    e.preventDefault();

    if (e.target.id === "prev") {
      this.setState(
        prevState => {
          return { currentPage: prevState.currentPage - 1 };
        },
        () => this.props.onSelectPageNumber(this.state.currentPage)
      );
    } else {
      this.setState(
        prevState => {
          return { currentPage: prevState.currentPage + 1 };
        },
        () => this.props.onSelectPageNumber(this.state.currentPage)
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
        <span
          className='current-page-style'
          contentEditable='true'
          suppressContentEditableWarning={true}
          onBlur={e => this.triggerPage(e)}
          id='currentPageId'
        >
          {this.state.currentPage}
        </span>
        <a href='#' id='next' onClick={e => this.handlePagination(e)}>
          Next
        </a>
      </div>
    );
  }
}

export default Pagination;
