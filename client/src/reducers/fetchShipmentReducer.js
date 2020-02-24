import { FETCH_SHIPMENT } from "../action/types";
import _ from "lodash";

export default (state = [], action) => {
  console.log(action.payload);
  switch (action.type) {
    case FETCH_SHIPMENT:
      return action.payload;
    default:
      return state;
  }
};
