import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header/header";
import { login } from "../utils/login";
import { GlobalContext } from "../context/GlobalState";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(GlobalContext);
  const onSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      password
    };

    loginUser(user);

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <Header />
      <form className="login" onSubmit={onSubmit}>
        <div className="login-form">
          <label htmlFor="email">Login</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email here"
          />
        </div>
        <div className="login-form">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter Password here"
          />
        </div>
        <button className="login-btn">Sign in</button>
        <Link className="signuplink" to="/signup">
          Dont have a account yet? Sign up here
        </Link>
      </form>
    </>
  );
};
