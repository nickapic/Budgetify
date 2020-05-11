import React, { Fragment } from "react";

import { connect } from "react-redux";
import { HeroSection } from "../components/herosection";
import { Manager } from "./manager";

const Home = ({ isAuthenticated }) => {
  const AuthenticatedLinks = (
    <Fragment>
      <Manager />
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
