import fetchShipment from "../fetchShipmentReducer";
import { FETCH_SHIPMENT } from "../../action/types";

it("handles action of searching shipment based on id", () => {
  const action = {
    type: FETCH_SHIPMENT,
    payload: [{ id: 2, name: "shipment2" }]
  };

  const newState = fetchShipment([], action);
  expect(newState).toEqual([{ id: 2, name: "shipment2" }]);
});
