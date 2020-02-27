import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "../../reducers";
import ShipmentResult from "../../components/ShipmentResult";
import { Link, BrowserRouter as Router } from "react-router-dom";

beforeEach(() => {
  moxios.install();
  moxios.stubRequest(`http://localhost:3000/shipments?_limit=20&_page=1`, {
    status: 200,
    response: []
  });
});

afterEach(() => {
  moxios.uninstall();
});
describe("INTEGRATION TEST", () => {
  it("NODE SERVER SHOULD BE RUNNING: can fetch a list of shipments and display them(20 rows of data + 1 row of column data)", done => {
    const wrapped = mount(
      <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
        <Router>
          <Link to='/' component={ShipmentResult}>
            <ShipmentResult />
          </Link>
        </Router>
      </Provider>
    );

    moxios.wait(() => {
      wrapped.update();
      console.log("DATA received below:-\n", wrapped.render().text());
      expect(wrapped.find("tr").length).toBeGreaterThanOrEqual(1);
      expect(wrapped.render().text()).toContain("Status");

      done();
      wrapped.unmount();
    });
  });
});
