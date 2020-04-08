import React, { useEffect, Fragment } from "react";
import { Transaction } from "./transaction";
import { getTransactions } from "../Redux/actions/transaction";
import { connect } from "react-redux";

const TransactionList = ({
  getTransactions,
  transaction: { transactions, loading },
  auth: { isAuthenticated }
}) => {
  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const authenticatedContent = (
    <section className="transaction-list-section">
      <ul className="transaction-list_container">
        {transactions.map(transaction => (
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

const mapStateToProps = state => ({
  transaction: state.transaction,
  auth: state.auth
});
export default connect(mapStateToProps, { getTransactions })(TransactionList);
