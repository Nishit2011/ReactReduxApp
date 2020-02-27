import React from "react";
import { mount } from "enzyme";
import Search from "../Search";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "../../reducers";

let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <Search />
    </Provider>
  );
});
afterEach(() => {
  wrapped.unmount();
});

describe("Search Component", () => {
  it("has textbox and button elements", () => {
    expect(wrapped.find("input").at(0).length).toEqual(1);
    expect(wrapped.find("button").length).toEqual(1);
  });
});
