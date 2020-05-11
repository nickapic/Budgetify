import React from "react";
import Balance from "../components/balance";
import IncomeExpense from "../components/incomexpense";
import AddItem from "../components/additem";
import TransactionList from "../components/transactionlist";

export const Manager = () => {
  return (
    <div className="manager-page">
      <div className="input-section">
        <Balance />
      </div>
      <div className="input-section_information">
        <div className="input-section_information-manager">
          <IncomeExpense />
          <AddItem />
        </div>
        <TransactionList />
      </div>
    </div>
  );
};
