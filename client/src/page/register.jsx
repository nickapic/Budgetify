import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../Redux/actions/alert";
import { register } from "../Redux/actions/auth";

import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="form-section" onSubmit={e => onSubmit(e)}>
      <h2 className="form-section_label">Register here</h2>
      <form className="form-section_form">
        <div className="form-control">
          <label className="form-label" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Full name here"
            value={name}
            onChange={e => onChange(e)}
            // required
          />
        </div>
        <div className="form-control">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Your Email here"
            onChange={e => onChange(e)}
            value={email}
            // required
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
            onChange={e => onChange(e)}
            value={password}
            // required
          />
        </div>
        <div className="form-control">
          <label className="form-label" htmlFor="name">
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            className="form-input"
            onChange={e => onChange(e)}
            placeholder="Confirm your password"
            value={password2}
            // required
          />
        </div>
        <input type="submit" className="form-input-btn" value="Register" />
      </form>
      <span className="form-section-login">
        Already have a account? <Link to="/login">Login here</Link>
      </span>
    </div>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
