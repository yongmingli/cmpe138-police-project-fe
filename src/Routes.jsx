import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Shared components
import { PrivateRoute } from "./components";

// Views
import Dashboard from "./views/Dashboard";
import Employees from "./views/Employees";
import Account from "./views/Account";
import SignIn from "./views/SignIn";
import NotFound from "./views/NotFound";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <PrivateRoute component={Dashboard} exact path="/dashboard" />
        <PrivateRoute component={Employees} exact path="/employees" />
        <PrivateRoute component={Account} exact path="/settings" />
        <Route component={SignIn} exact path="/sign-in" />
        <Route component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
