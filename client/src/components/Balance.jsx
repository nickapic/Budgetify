import React from "react";
import { connect } from "react-redux";
import { numberWithCommas } from "../utils/format";

const Balance = ({ transactions }) => {
  const amounts = transactions.map(transaction => transaction.amount);
  console.log(amounts);
  const total = amounts.reduce((prev, cur) => (prev += cur), 0);
  let negative = false;

  if (total < 0) {
    negative = true;
  }

  const Income = (
    <h2 className="input-section_money">${numberWithCommas(total)}</h2>
  );
  const Expense = (
    <h2 className="input-section_money">
      -${numberWithCommas(Math.abs(total))}
    </h2>
  );
  return (
    <div>
      <div>
        <h2 className="input-section_title">Your available budget is</h2>
        {!negative ? Income : Expense}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  transactions: state.transaction.transactions
});

export default connect(mapStateToProps)(Balance);
