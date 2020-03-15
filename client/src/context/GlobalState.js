import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//Initial
const initialState = {
  transactions: [],
  error: null,
  loading: true
};

//Creating Context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions");
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: err.response.data.error
      });
    }
  }

  //Actions
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: err.response.data.error
      });
    }
  }
  async function addTransaction(transaction) {
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: err.response.data.error
      });
    }
  }
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        getTransactions,
        loading: state.loading,
        deleteTransaction,
        error: state.error,
        addTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
