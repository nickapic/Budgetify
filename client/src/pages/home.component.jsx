import React from "react";
import { Header } from "../components/Header/header";
import { Balance } from "../components/Balance";
import { IncomeExpenses } from "../components/IncomeExpenses";
import { AddTransaction } from "../components/AddTransaction/AddTransaction";
import { TransactionList } from "../components/TransactionList/TransactionList";

export const Home = () => {
  return (
    <div className="main-container">
      <div className="content-container">
        <Header className="header" />
        <div className="content-container-left">
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
};
