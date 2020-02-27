import { FETCH_SHIPMENT } from "../action/types";

export default (state = [], action) => {
  //console.log(action.payload);
  switch (action.type) {
    case FETCH_SHIPMENT:
      return action.payload;
    default:
      return state;
  }
};
