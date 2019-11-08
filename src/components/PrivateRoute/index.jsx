import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import { authenticate } from "../../services/auth";
import { connect } from "react-redux";
import { loginRedux } from "../../redux/actions";

const PrivateRoute = ({ component: Component, access, ...rest }) => {
  rest.dispatch({ type: "AUTHENTICATE" });

  authenticate().then(res => {
    if (!res.status) {
      localStorage.removeItem("jwt");
      window.location.href = "/sign-in";
    } else {
      rest.dispatch(loginRedux(res.data.employee));
    }
  });

  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("jwt") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default connect()(PrivateRoute);
