import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { CircularProgress, Typography, withStyles } from "@material-ui/core";

// Material components
import { Grid } from "@material-ui/core";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../../../layouts";

// Custom components
import {
  EmergenciesInProgress,
  Employees,
  EmergenciesResolved
} from "../../components";

// Component styles
import styles from "./styles";
import { getEmergencies } from "../../../../services/emergency";
import { EmergencyTable } from "../../../Emergencies/components";

class DashboardCallOperator extends Component {
  state = {
    isLoading: false,
    emergencies: []
  };

  async fetchEmergencies() {
    try {
      this.setState({ isLoading: true });
      const { emergencies } = await getEmergencies();
      
      this.setState({
        isLoading: false,
        emergencies 
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
        error
      });
    }
  }

  componentDidMount() {
    this.fetchEmergencies();
  }

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, emergencies, error } = this.state;
    console.log("asd1", this.state);
    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (emergencies.length === 0) {
      return <Typography variant="h6">There are no emergencies</Typography>;
    }

    return <EmergencyTable emergencies={emergencies} />;
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <Employees className={classes.item} />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <EmergenciesInProgress className={classes.item} />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <EmergenciesResolved className={classes.item} />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              {this.renderUsers()}
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

DashboardCallOperator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardCallOperator);
