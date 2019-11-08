import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Shared components
import { PrivateRoute } from "./components";

// Views
import Dashboard from "./views/Dashboard";
import AccessPointList from "./views/AccessPointList";
import AccessRecordList from "./views/AccessRecordList";
import UserList from "./views/UserList";
import Account from "./views/Account";
import Settings from "./views/Settings";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import UnderDevelopment from "./views/UnderDevelopment";
import NotFound from "./views/NotFound";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <PrivateRoute component={Dashboard} exact path="/dashboard" />
        <PrivateRoute component={UserList} exact path="/employees" />
        <PrivateRoute component={AccessPointList} exact path="/access-points" />
        <PrivateRoute
          component={AccessRecordList}
          exact
          path="/access-records"
        />
        <PrivateRoute component={Account} exact path="/account" />
        <PrivateRoute component={Account} exact path="/settings" />
        <Route component={SignUp} exact path="/sign-up" />
        <Route component={SignIn} exact path="/sign-in" />
        <Route component={UnderDevelopment} exact path="/under-development" />
        <Route component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
