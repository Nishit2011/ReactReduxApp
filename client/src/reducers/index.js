import { combineReducers } from "redux";
import fetchShipmentsReducer from "./fetchShipmentsReducer";
import fetchShipmentReducer from "./fetchShipmentReducer";
import updateNameReducer from "./updateNameReducer";

export default combineReducers({
  fetchShipmentsReducer,
  fetchShipmentReducer,
  updateNameReducer
});
