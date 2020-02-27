import { UPDATE_NAME } from "../action/types";

export default (state = [], action) => {
  //   console.log(action.payload);
  switch (action.type) {
    case UPDATE_NAME:
      return action.payload;
    default:
      return state;
  }
};
