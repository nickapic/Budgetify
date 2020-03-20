import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import stringify from "json-stringify-safe";
import axios from "axios";

//Initial
const initialState = {
  transactions: [],
  error: null,
  loading: true,
  currentUser: ""
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
  async function signUser(user) {
    try {
      const res = await axios.post(`/api/v1/user/signup`, user);
      console.log(stringify(res.data.data.user.name));
      dispatch({
        type: "SIGNED_IN",
        payload: stringify(res.data.data.user.name)
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  }
  async function logoutUser(user) {
    try {
      const res = await axios.post(`/api/v1/user/login`, user);
      console.log(stringify(res.data.data.user.name));
      dispatch({
        type: "LOGGED_IN",
        payload: stringify(res.data.data.user.name)
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  }
  async function loginUser(user) {
    try {
      const res = await axios.post(`/api/v1/user/login`, user);
      console.log(stringify(res.data.data.user.name));
      dispatch({
        type: "LOGGED_IN",
        payload: stringify(res.data.data.user.name)
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

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
        addTransaction,
        currentUser: state.currentUser,
        loginUser,
        signUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
