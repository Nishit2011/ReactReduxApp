import React, { Component } from "react";
import "../styles/shipment-result-style.css";
import { fetchShipments, fetchShipment } from "../action/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Search from "./Search";

class ShipmentResults extends Component {
  state = {
    limit: 20,
    page: 1,
    totalElems: 0,
    currentPage: 1,
    searchResults: [],
    flag: true
  };
  componentDidMount() {
    this.props.fetchShipments(20, this.state.page);
  }
  getSearchResultById = id => {
    debugger;
    if (id) {
      this.setState({ flag: false }, () => this.props.fetchShipment(id));
    } else {
      this.setState({ flag: true }, () => () =>
        this.props.fetchShipments(20, this.state.page)
      );
    }
  };

  getPageNumber = (page, totalPage) => {
    console.log("page:-", this.state.totalPage);

    this.setState({ page }, () =>
      this.props.fetchShipments(20, this.state.page)
    );
  };

  setTextField(e) {
    console.log(e.target.value);
  }

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
    //this.props.getAllResults(this.props.res);

    const data = this.state.flag ? this.props.res : this.props.resBasedOnId;

    return data.map((row, index) => {
      const names = [];
      names[index] = row.name;
      localStorage.setItem("names", JSON.stringify(names));

      return (
        <tr key={index} className='shipment-result-tbl-row'>
          <td>{index + 1}</td>
          <td className='shipment-result-tbl-id'>{row.id}</td>
          <td
            className='shipment-result-tbl-name'
            contentEditable='true'
            suppressContentEditableWarning={true}
            onBlur={e => this.setTextField(e)}
          >
            {JSON.parse(localStorage.getItem("names"))}
          </td>
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
        <Search getSearchResultById={val => this.getSearchResultById(val)} />
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
  return {
    res: state.fetchShipmentsReducer,
    resBasedOnId: state.fetchShipmentReducer
  };
};
export default connect(mapStateToProps, { fetchShipments, fetchShipment })(
  ShipmentResults
);
