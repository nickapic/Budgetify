import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);
  console.log(amounts);

  const total = amounts.reduce((prev, cur) => (prev += cur), 0);

  return (
    <div className="balance-container">
      <h3>Your Current Available Balance is</h3>
      <h1 id="balance">${numberWithCommas(total)}</h1>
    </div>
  );
};
