import React from "react";
import { mount } from "enzyme";
import ShipmentResult from "../ShipmentResult";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "../../reducers";
import Search from "../Search";
import { Link, BrowserRouter as Router } from "react-router-dom";

let wrapped;
beforeEach(() => {
  const initialState = {
    fetchShipmentsReducer: [
      { id: 1, name: "shipmentxyz", status: "xyz", details: "click" },
      { id: 2, name: "shipmentabc", status: "abc", details: "click" }
    ]
  };
  wrapped = mount(
    <Provider
      store={createStore(reducers, initialState, applyMiddleware(thunk))}
    >
      <Router>
        <Link to='/details' component={ShipmentResult}>
          <ShipmentResult />
        </Link>
      </Router>
    </Provider>
  );
});

describe("SHIPMENT RESULTS COMPONENT", () => {
  it("returns instance of search within Shipment Result", () => {
    expect(wrapped.find(Search).length).toEqual(1);
  });
  it("shows the text for each shipment", () => {
    expect(wrapped.render().text()).toContain("shipmentxyz");
  });
});
