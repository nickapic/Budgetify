import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./transaction";
export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);
  console.log(amounts);

  const total = amounts.reduce((prev, cur) => (prev += cur), 0);

  return (
    <div>
      <h4>Your Balance</h4>
      <h1 id="balance">${total}</h1>
    </div>
  );
};
