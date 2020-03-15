import React from "react";
import "./App.scss";
import Header from "./components/Header/header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/TransactionList/TransactionList";
import { AddTransaction } from "./components/AddTransaction/AddTransaction";

function App() {
  return (
    <div className="main-container">
      <div className="content-container">
        <div className="content-container-left">
          <Header className="header" />
          <Balance />
          <IncomeExpenses />
          <AddTransaction />
        </div>
        <div className="content-container-right">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}

export default App;
