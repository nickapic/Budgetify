import React, { useContext } from "react";
import "./headerStyles.scss";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

export function Header({ color }) {
  const { currentUser, logoutUser } = useContext(GlobalContext);
  return (
    <div className="header">
      <Link to="/" className="title">
        Budgeitfy
      </Link>
      <div className="navbaritems">
        <Link to="/login" className="navbarlink">
          Login
        </Link>
        <Link to="/signup" className="navbarlink">
          Register
        </Link>{" "}
      </div>
    </div>
  );
}
