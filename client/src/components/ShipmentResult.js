import React, { Component } from "react";
import "../styles/shipment-result-style.css";
import { fetchShipments } from "../action/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

class ShipmentResults extends Component {
  state = {
    limit: 20,
    page: 1,
    totalElems: 0,
    currentPage: 1,
    searchResult: []
  };
  componentDidMount() {
    this.props.fetchShipments(20, this.state.page);
  }

  getPageNumber = (page, totalPage) => {
    console.log("page:-", this.state.totalPage);

    this.setState({ page }, () =>
      this.props.fetchShipments(20, this.state.page)
    );
  };

  getSearchResultById(val) {}

  sortTable(columnIndex) {
    let shouldSwitch;
    let i;
    let switchcount = 0;
    let table = document.getElementById("resultTbl");
    let toggleSort = true;
    let defaultSearchOption = "asc";
    while (toggleSort) {
      toggleSort = false;
      let rows = table.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        let x = rows[i].getElementsByTagName("td")[columnIndex];
        let y = rows[i + 1].getElementsByTagName("td")[columnIndex];
        if (defaultSearchOption == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (defaultSearchOption == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        toggleSort = true;
        switchcount++;
      } else {
        if (switchcount == 0 && defaultSearchOption == "asc") {
          defaultSearchOption = "desc";
          toggleSort = true;
        }
      }
    }
  }

  renderShipmentResultTable() {
    //console.log(this.props.res);
    //this.props.getAllResults(this.props.res);

    return this.props.res.map((row, index) => {
      return (
        <tr key={index} className='shipment-result-tbl-row'>
          <td>{index + 1}</td>
          <td className='shipment-result-tbl-id'>{row.id}</td>
          <td className='shipment-result-tbl-name'>{row.name}</td>
          <td>{row.status}</td>
          <td>
            <Link to={`/details/${row.id}`} id={row.id}>
              Click Here
            </Link>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <table id='resultTbl' className='shipment-result-tbl'>
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => this.sortTable(1)}>Id</th>
              <th onClick={() => this.sortTable(2)}>Name</th>
              <th onClick={() => this.sortTable(3)}>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody className='shipment-result-tbl-body'>
            {this.props.res ? (
              this.renderShipmentResultTable()
            ) : (
              <div>Loading...</div>
            )}
          </tbody>
        </table>
        <div>
          <Pagination
            res={this.props.res}
            onSelectPageNumber={this.getPageNumber}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return { res: state.fetchShipmentsReducer };
};
export default connect(mapStateToProps, { fetchShipments })(ShipmentResults);
