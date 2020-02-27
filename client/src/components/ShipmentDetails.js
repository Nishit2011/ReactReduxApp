import React, { Component } from "react";
import "../styles/shipment-details-style.css";
import { fetchShipment, updateName } from "../action/index";
import { connect } from "react-redux";

class ShipmentDetails extends Component {
  componentDidMount() {
    this.props.fetchShipment(this.props.match.params.id);
    console.log(this.props.res);
  }

  renderCargo(el, index) {
    return (
      <div key={index} className='cargoRow'>
        <div>Type: {el.type}</div>
        <div>Description: {el.description}</div>
        <div>Volume: {el.volume}</div>
      </div>
    );
  }

  renderService(el, index) {
    return (
      <div key={index}>
        <div>Type: {el.type}</div>
        <div>Description: {el.description}</div>
        <div>Volume: {el.volume}</div>
      </div>
    );
  }

  setTextField(id) {
    console.log(id);

    //debugger;
    const shipmentName = document.querySelector(`#${id}`).textContent;
    this.props.updateName(id, shipmentName);
  }

  renderShipmentDetailsTbl() {
    const {
      id,
      name,
      cargo,
      mode,
      type,
      destination,
      origin,
      services,
      total,
      status,
      userId
    } = this.props.res;

    return (
      <table className='tbl' key={id}>
        <tbody>
          <tr>
            <th>Id</th>
            <td>{id}</td>
          </tr>
          <tr>
            <th>Shipment Name</th>
            <td
              contentEditable='true'
              id={id}
              suppressContentEditableWarning={true}
              onBlur={e => this.setTextField(e.target.id)}
            >
              {name}
            </td>
          </tr>
          <tr>
            <th>Cargo</th>
            <td>
              {cargo
                ? cargo.map((el, index) => this.renderCargo(el, index))
                : ""}
            </td>
          </tr>
          <tr>
            <th>Model</th>
            <td>{mode}</td>
          </tr>
          <tr>
            <th>Type</th>
            <td>{type}</td>
          </tr>
          <tr>
            <th>Destination</th>
            <td>{destination}</td>
          </tr>
          <tr>
            <th>Origin</th>
            <td>{origin}</td>
          </tr>
          <tr>
            <th>Services</th>
            <td>
              {services
                ? services.map((el, index) => this.renderService(el, index))
                : ""}
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{total}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{status}</td>
          </tr>
          <tr>
            <th>User Id</th>
            <td>{userId}</td>
          </tr>
        </tbody>
      </table>
    );
  }
  render() {
    return (
      <div>
        <div className='shipment-details'>
          {this.props.res ? (
            this.renderShipmentDetailsTbl()
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { res: state.fetchShipmentReducer[0] };
};

export default connect(mapStateToProps, { fetchShipment, updateName })(
  ShipmentDetails
);
