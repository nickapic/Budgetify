import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Transaction } from "../Transaction/transaction";
import "./TransactionListStyles.scss";
export const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  useEffect(() => {
    getTransactions();
    //eslint-disable-net-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="transaction-list">
      <h3>Transactions</h3>
      <ul id="list" className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
};
