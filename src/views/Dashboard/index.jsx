import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

// Externals
import PropTypes from "prop-types";

import { getUser } from "../../redux/selectors";
// Material helpers
import { withStyles } from "@material-ui/core";

import { DashboardAdmin, DashboardCallOperator } from "./boards";
// Component styles
import styles from "./styles";

class Dashboard extends Component {

  render() {
    const { user } = this.props;
    return (
      <>
        {user && user.type && user.type === "ADMIN" ? <DashboardAdmin /> : null}
        {user && user.type && user.type === "CALL_OPERATOR" ? (
          <DashboardCallOperator />
        ) : null}
        ;
      </>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return getUser(state);
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Dashboard);
