import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../Redux/actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="authentication-page">
      <div className="form-section">
        <h2 className="form-section_label">Log in here</h2>
        <form className="form-section_form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-control">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Your Email here"
              onChange={(e) => onChange(e)}
              value={email}
              required
            />
          </div>
          <div className="form-control">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password here"
              onChange={(e) => onChange(e)}
              value={password}
              required
            />
          </div>
          <input type="submit" className="form-input-btn" value="Log in" />
        </form>
        <span className="form-section-login">
          Don't have a account? <Link to="/signup">Register here</Link>
        </span>
      </div>
    </div>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
