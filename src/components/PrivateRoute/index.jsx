import React from "react";
import { Redirect, Route } from "react-router-dom";

import { authenticate } from "../../services/auth";
import { connect } from "react-redux";
import { loginRedux } from "../../redux/actions";
import { compose } from "redux";

const PrivateRoute = ({ component: Component, access, loginRedux, ...rest }) => {
  // rest.dispatch({ type: "AUTHENTICATE" });

  authenticate().then(res => {
    if (!res.status) {
      localStorage.removeItem("jwt");
      window.location.href = "/sign-in";
    } else {
      const { employee } = res.data;
      loginRedux(employee);
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


export default compose(
  connect(
    null,
    { loginRedux }
  ),
)(PrivateRoute);


// export default connect()(PrivateRoute);
