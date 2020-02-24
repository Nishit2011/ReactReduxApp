import { FETCH_DETAIL, FETCH_SHIPMENT, FETCH_SHIPMENTS } from "./types";
import axios from "axios";
import history from "../history/history";
import baseURL from "./api/api";

export const fetchShipments = (limit, page) => async dispatch => {
  const response = await baseURL.get(
    `/shipments?_limit=${limit}&_page=${page}`
  );

  //console.log(response);
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
