import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Grid } from "@material-ui/core";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Shared components
import { OrdersTable } from "../../components";

// Custom components
import {
  DeniedAccess,
  Users,
  PercentSuccessfulAccess,
  SuccessfulAccess
} from "./components";

// Component styles
import styles from "./styles";

class Dashboard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Users className={classes.item} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <DeniedAccess className={classes.item} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SuccessfulAccess className={classes.item} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <PercentSuccessfulAccess className={classes.item} />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <OrdersTable className={classes.item} />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
