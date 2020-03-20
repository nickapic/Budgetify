import React from "react";
import "./App.scss";
import { Home } from "./pages/home.component";
import { Switch, Route } from "react-router-dom";
import { Login } from "./pages/login.component";
import { SignUp } from "./pages/signup.component";

function App() {
  return (
    <div className="main-container">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
