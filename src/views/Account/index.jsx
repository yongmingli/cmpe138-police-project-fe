import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { getUser } from "../../redux/selectors";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Grid, CircularProgress } from "@material-ui/core";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Custom components
import { AccountDetails, Password } from "./components";

// Component styles
import styles from "./styles";

class Account extends Component {
  state = { tabIndex: 0 };

  render() {
    const { classes, user } = this.props;
    return (
      <DashboardLayout title="Account">
        <div className={classes.root}>
          {user.type === undefined ? (
            <CircularProgress className={classes.progress} />
          ) : (
            <Grid container spacing={4}>
              <Grid item lg={4} md={6} xl={4} xs={12}>
                <Password user={user} />
              </Grid>
              <Grid item lg={8} md={6} xl={8} xs={12}>
                <AccountDetails user={user} />
              </Grid>
            </Grid>
          )}
        </div>
      </DashboardLayout>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return getUser(state);
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Account);
