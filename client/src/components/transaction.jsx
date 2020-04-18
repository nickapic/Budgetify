import React from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../Redux/actions/transaction";
import PropTypes from "prop-types";

export const Transaction = ({ transaction }) => {
  const dispatch = useDispatch();
  const { text, amount, _id } = transaction;
  return (
    <li className="transaction-list_item">
      <h4 className="transaction-list_item-text">{text}</h4>
      <h4 className="transaction-list_item-amount">${amount}</h4>
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
