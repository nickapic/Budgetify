import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../Redux/actions/transaction";

const AddItem = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("general");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      text,
      amount: +amount,
      category,
    };
    dispatch(addTransaction(newTransaction));
    console.log(newTransaction);
    setText("");
    setAmount(0);
    setCategory("general");
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
            onChange={(e) => setText(e.target.value)}
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
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
          <label for="categories">Choose a category:</label>
          <select
            className="addtransaction-input"
            id="categories"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Groceries">Groceries</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Technology">Technology</option>
          </select>
        </div>
        <button className="btn">
          <i class="far fa-arrow-alt-circle-right"></i>
        </button>
      </form>
    </div>
  );
};
export default AddItem;
