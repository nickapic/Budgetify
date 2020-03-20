import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header/header";
import { GlobalContext } from "../context/GlobalState";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const { signUser } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      password,
      passwordConfirm,
      name
    };
    signUser(user);

    setEmail("");
    setPasswordConfirm("");
    setName("");
    setPassword("");
  };
  return (
    <>
      <Header />
      <form className="login" onSubmit={onSubmit}>
        <div className="login-form">
          <label htmlFor="email">Email</label>
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
        <div className="login-form">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            placeholder="Enter Password here"
          />
        </div>{" "}
        <div className="login-form">
          <label htmlFor="password">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter Password here"
          />
        </div>
        <button className="login-btn">Sign up</button>
        <Link className="signuplink" to="/signup">
          Dont have a account yet? Sign up here
        </Link>
      </form>
    </>
  );
};
