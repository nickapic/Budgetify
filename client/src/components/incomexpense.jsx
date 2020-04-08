import React from "react";
import { connect } from "react-redux";
import { numberWithCommas } from "../utils/format";

const IncomeExpense = ({ transactions }) => {
  const amounts = transactions.map(transaction => transaction.amount);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);
  const expense =
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1;

  return (
    <div>
      <div className="incomecontainer">
        <h3 className="containertext">Income</h3>
        <h3 className="containervalue">${numberWithCommas(income)}</h3>
      </div>
      <div className="expensecontainer">
        <h3 className="containertext">Expense</h3>
        <h3 className="containervalue">-${numberWithCommas(expense)}</h3>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  transactions: state.transaction.transactions
});

export default connect(mapStateToProps)(IncomeExpense);
