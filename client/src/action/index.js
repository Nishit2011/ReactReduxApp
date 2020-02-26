import { UPDATE_NAME, FETCH_SHIPMENT, FETCH_SHIPMENTS } from "./types";
import axios from "axios";
import history from "../history/history";
import baseURL from "./api/api";

export const fetchShipments = (limit, page) => async dispatch => {
  const response = await baseURL.get(
    `/shipments?_limit=${limit}&_page=${page}`
  );

  dispatch({
    type: FETCH_SHIPMENTS,
    payload: response.data
  });
};

export const fetchShipment = id => async dispatch => {
  const response = await baseURL.get(`/shipments/${id}`);
  let arr = [];
  arr.push(response.data);
  dispatch({
    type: FETCH_SHIPMENT,
    payload: arr
  });
};

export const updateName = (id, name) => async dispatch => {
  console.log(name);
  const response = await baseURL.patch(`/shipments/${id}`, {
    name: name
  });

  dispatch({
    type: UPDATE_NAME,
    payload: response.data
  });
};
