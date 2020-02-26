import React, { Component } from "react";
import "../styles/shipment-result-style.css";
import { fetchShipments, fetchShipment, updateName } from "../action/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Search from "./Search";
import sortIcon from "../assets/sort_icon.png";

class ShipmentResults extends Component {
  state = {
    limit: 20,
    page: 1,
    totalElems: 0,
    currentPage: 1,
    searchResults: [],
    flag: true,
    shipmentName: "",
    editableFlag: false,
    nameArr: [],
    inputRefs: []
  };
  componentDidMount() {
    this.props.fetchShipments(20, this.state.page);
  }

  getSearchResultById = id => {
    if (id) {
      this.setState({ flag: false }, () => this.props.fetchShipment(id));
    } else {
      this.setState({ flag: true }, () => () =>
        this.props.fetchShipments(20, this.state.page)
      );
    }
  };

  persist(e) {
    localStorage.setItem("naam", e.target.value);
    let temp = [];
  }

  getPageNumber = page => {
    console.log("page:-", this.state.totalPage);

    this.setState({ page }, () =>
      this.props.fetchShipments(20, this.state.page)
    );
  };

  setTextField(id) {
    console.log(id);

    //debugger;
    const shipmentName = document.querySelector(`#${id}`).textContent;
    this.props.updateName(id, shipmentName);
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
      return (
        <tr key={index} className='shipment-result-tbl-row'>
          <td>&nbsp;{index + 1}</td>
          <td className='shipment-result-tbl-id'>{row.id}</td>
          <td
            className='shipment-result-tbl-name'
            contentEditable='true'
            id={row.id}
            suppressContentEditableWarning={true}
            onBlur={e => this.setTextField(e.target.id)}
          >
            {row.name}
          </td>
          <td>{row.status}</td>
          <td>
            <Link className='click-here' to={`/details/${row.id}`} id={row.id}>
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
              <th onClick={() => this.sortTable(1)}>
                Id
                <img className='sort-icon' src={sortIcon} />
              </th>
              <th onClick={() => this.sortTable(2)}>
                Shipment Name <img className='sort-icon' src={sortIcon} />
              </th>
              <th onClick={() => this.sortTable(3)}>
                Status <img className='sort-icon' src={sortIcon} />
              </th>
              <th>
                Details <img className='sort-icon' src={sortIcon} />
              </th>
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
export default connect(mapStateToProps, {
  fetchShipments,
  fetchShipment,
  updateName
})(ShipmentResults);
