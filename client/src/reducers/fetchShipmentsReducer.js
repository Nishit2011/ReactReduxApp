import { FETCH_SHIPMENTS } from "../action/types";
import _ from "lodash";

export default (state = [], action) => {
  //   console.log(action.payload);
  switch (action.type) {
    case FETCH_SHIPMENTS:
      return action.payload;
    default:
      return state;
  }
};
