import React, { Fragment } from "react";
import Balance from "../components/balance";
import IncomeExpense from "../components/incomexpense";
import AddItem from "../components/additem";
import TransactionList from "../components/transactionlist";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = ({ isAuthenticated }) => {
  const AuthenticatedLinks = (
    <Fragment>
      <div className="input-section">
        <Balance />
        <IncomeExpense />
        <AddItem />
      </div>
      <div className="transaction-section">
        <TransactionList />
      </div>
    </Fragment>
  );
  const unAuthorizedLinks = (
    <div className="main-unauthorised">
      <div className="hero-section">
        <h2 className="hero-section-heading">
          A Simple Budget manager application that lets you track your income
          and expense with a easy to use UI{" "}
        </h2>
        <Link className="hero-section-btn" to="/login">
          Login to Access <i className="fas fa-arrow-right"></i>
        </Link>
        <h4 className="hero-section-link">
          Don't have an account ?{" "}
          <Link to="/signup">Click here to Sign up</Link>{" "}
        </h4>
      </div>
    </div>
  );

  return (
    <div className="main-container">
      {isAuthenticated ? AuthenticatedLinks : unAuthorizedLinks}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
