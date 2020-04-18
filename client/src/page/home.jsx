import React, { Fragment } from "react";
import Balance from "../components/balance";
import IncomeExpense from "../components/incomexpense";
import AddItem from "../components/additem";
import TransactionList from "../components/transactionlist";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { HeroSection } from "../components/herosection";

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
      <HeroSection />
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
