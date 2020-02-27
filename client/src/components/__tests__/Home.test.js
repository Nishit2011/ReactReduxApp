import React from "react";
import { shallow } from "enzyme";
import Home from "../Home";
import ShipmentResult from "../ShipmentResult";

describe("HOME COMPONENT", () => {
  it("it shows a Home box", () => {
    const wrapped = shallow(<Home />);
    expect(wrapped.find(ShipmentResult).length).toEqual(1);
  });
});
