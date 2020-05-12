import React from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../Redux/actions/transaction";
import PropTypes from "prop-types";
import { numberWithCommas } from "../utils/format";

export const Transaction = ({ transaction }) => {
  const dispatch = useDispatch();
  const { text, amount, category, _id } = transaction;

  let negative = false;
  if (amount < 0) {
    negative = true;
  }
  const Income = (
    <h4 className="transaction-list_item-amount ">
      ${numberWithCommas(amount)}
    </h4>
  );
  const Expense = (
    <h4 className="transaction-list_item-amount ">
      -${numberWithCommas(Math.abs(amount))}
    </h4>
  );
  return (
    <li
      className={
        "transaction-list_item " + (!negative ? "income-item" : "expense-item")
      }
    >
      <h4 className="transaction-list_item-text">{text}</h4>
      {!negative ? Income : Expense}
      <button
        onClick={() => dispatch(deleteTransaction(_id))}
        className="delete-btn button-space"
      >
        <i class="fas fa-trash"></i>
      </button>
    </li>
  );
};

Transaction.propTypes = {
  deleteTransaction: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
};

export default Transaction;
