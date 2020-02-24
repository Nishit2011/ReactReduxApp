import { combineReducers } from "redux";
import fetchShipmentsReducer from "./fetchShipmentsReducer";
import fetchShipmentReducer from "./fetchShipmentReducer";

export default combineReducers({
  fetchShipmentsReducer,
  fetchShipmentReducer
});
