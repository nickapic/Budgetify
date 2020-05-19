import React, { useEffect, Fragment, useState } from "react";
import { Transaction } from "./transaction";
import { getTransactions } from "../Redux/actions/transaction";
import { connect } from "react-redux";

const TransactionList = ({
  getTransactions,
  transaction: { transactions, loading },
  auth: { isAuthenticated },
}) => {
  useEffect(() => {
    getTransactions();
  }, [getTransactions]);
  const [searchField, setsearchField] = useState("");

  const filteredContent = transactions.filter((transaction) => {
    return transaction.text.toLowerCase().includes(searchField.toLowerCase());
  });

  const authenticatedContent = (
    <section className="transaction-list-section">
      <div className="transaction-list_section-details">
        <h3 className="transaction-list_section-heading">Transactions</h3>
        <input
          className="transaction-list_section-searchbox"
          type="search"
          placeholder="Search Transactions"
          onChange={(e) => setsearchField(e.target.value)}
        />
      </div>
      <ul className="transaction-list_container">
        {filteredContent.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </section>
  );
  const isNotAuthenticated = (
    <section className="transaction-list-section">
      <h1 className="errormsg">
        Your not Authenticated. <br /> Please Log in or Sign up
      </h1>
    </section>
  );

  return (
    <Fragment>
      {isAuthenticated ? authenticatedContent : isNotAuthenticated}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  auth: state.auth,
});
export default connect(mapStateToProps, { getTransactions })(TransactionList);
