import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_TRANSACTIONS,
  TRANSACTION_ERROR,
  ADD_TRANSACTION,
  DELETE_TRANSACTION
} from "./types";

export const getTransactions = () => async dispatch => {
  try {
    const res = await axios.get("/api/v1/transaction");
    console.log("error occured in the get function");

    console.log(res);
    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post

export const deleteTransaction = id => async dispatch => {
  try {
    await axios.delete(`/api/v1/transaction/${id}`);

    dispatch({
      type: DELETE_TRANSACTION,
      payload: id
    });

    dispatch(setAlert("Transaction Removed", "success"));
  } catch (err) {
    console.log("error occured in the delete function");
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Transaction
export const addTransaction = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/v1/transaction", formData, config);

    dispatch({
      type: ADD_TRANSACTION,
      payload: res.data
    });

    dispatch(setAlert("Transaction Created", "success"));
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
