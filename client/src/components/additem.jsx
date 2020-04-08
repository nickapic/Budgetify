import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../Redux/actions/transaction";

const AddItem = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    const newTransaction = {
      text,
      amount: +amount
    };
    dispatch(addTransaction(newTransaction));
    console.log(newTransaction);
    setText("");
    setAmount(0);
  };

  return (
    <div className="add-transactions">
      <h3 className="add-transaction-title">Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label className="addtransaction-label" htmlFor="text">
            Text
          </label>
          <input
            type="text"
            value={text}
            className="addtransaction-input"
            onChange={e => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label className="addtransaction-label" htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            className="addtransaction-input"
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  );
};
export default AddItem;
