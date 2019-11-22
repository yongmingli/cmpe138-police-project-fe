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
import { EmergenciesInProgress, EmergenciesResolved } from "../../components";

import {
  createEmergency,
  getEmergencies,
  updateEmergency,
  searchEmergency
} from "services/emergency";

// Component styles
import styles from "./styles";
import { EmergencyTable } from "../../../Emergencies/components";
import { EmergencyToolbar } from "views/Emergencies/components";

class DashboardCallOperator extends Component {
  state = {
    isLoading: false,
    emergencies: [],
    error: null
  };

  async addEmergency(create, params) {
    if (create) {
      try {
        await createEmergency({ ...params });
        await this.fetchEmergencies();
      } catch (e) {
        console.log("error creating emergency", e);
      }
    }
  }

  async editEmergency(params) {
    try {
      await updateEmergency({ ...params });
      await this.fetchEmergencies();
    } catch (e) {
      console.log("error updating emergency", e);
    }
  }

  async fetchEmergencies(q) {
    try {
      this.setState({ isLoading: true });

      if (q) {
        const { emergencies } = await searchEmergency({ emergency_name: q });
        this.setState({
          isLoading: false,
          emergencies
        });
      } else {
        const { emergencies } = await getEmergencies(/*limit*/); // TODO add pagination
        this.setState({
          isLoading: false,
          emergencies
        });
      }
    } catch (error) {
      const msg = error.toString();
      console.log(error);
      this.setState({
        isLoading: false,
        error: msg
      });
    }
  }

  componentDidMount() {
    this.fetchEmergencies();
  }

  renderEmergencies(emergencies) {
    console.log("renderEmergencies called", emergencies);
    const { classes } = this.props;
    const { isLoading, error } = this.state;

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

    return (
      <EmergencyTable
        emergencies={emergencies}
        refresh={this.fetchEmergencies.bind(this)}
        updateEmergency={this.editEmergency.bind(this)}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { emergencies } = this.state;

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <EmergenciesInProgress className={classes.item} />
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <EmergenciesResolved className={classes.item} />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <EmergencyToolbar
                createEmergency={this.addEmergency.bind(this)}
                search={this.fetchEmergencies.bind(this)}
              />
              {this.renderEmergencies(emergencies)}
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
