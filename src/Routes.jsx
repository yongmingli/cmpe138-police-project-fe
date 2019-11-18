import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Shared components
import { PrivateRoute } from "./components";

// Views
import Dashboard from "./views/Dashboard";
import AccessPointList from "./views/AccessPointList";
import Employees from "./views/Employees";
import Emergencies from "./views/Emergencies";
import Account from "./views/Account";
import SignIn from "./views/SignIn";
import UnderDevelopment from "./views/UnderDevelopment";
import NotFound from "./views/NotFound";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <PrivateRoute component={Dashboard} exact path="/dashboard" />
        <PrivateRoute component={Employees} exact path="/employees" />
        <PrivateRoute component={Emergencies} exact path="/emergencies" />
        <PrivateRoute component={AccessPointList} exact path="/access-points" />
        <PrivateRoute component={Account} exact path="/settings" />
        <Route component={SignIn} exact path="/sign-in" />
        <Route component={UnderDevelopment} exact path="/under-development" />
        <Route component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
