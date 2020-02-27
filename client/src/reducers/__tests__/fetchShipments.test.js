import fetchShipments from "../fetchShipmentsReducer";
import { FETCH_SHIPMENTS } from "../../action/types";

it("handles action of fetching all shipments", () => {
  const action = {
    type: FETCH_SHIPMENTS,
    payload: [{ id: 1, name: "shipment1" }]
  };

  const newState = fetchShipments([], action);
  expect(newState).toEqual([{ id: 1, name: "shipment1" }]);
});

it("handles action with unknown types", () => {
  const newState = fetchShipments([], {});
  expect(newState).toEqual([]);
});
