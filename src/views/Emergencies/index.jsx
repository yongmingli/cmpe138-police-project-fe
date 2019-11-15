import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { CircularProgress, Typography } from "@material-ui/core";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Shared services
import { createEmergency, getEmergencies } from "../../services/emergency";

// Custom components
import { EmergencyToolbar, EmergencyTable } from "./components";

// Component styles
import styles from "./style";

// TODO: refresh table when emergency is created.

class Emergencies extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    emergencies: [],
    error: null
  };

  async getUsers() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state; // TODO add pagination

      const { emergencies } = await getEmergencies(/*limit*/); // TODO add pagination

      if (this.signal) {
        this.setState({
          isLoading: false,
          emergencies
        });
      }
    } catch (error) {
      console.log(error);
      if (this.signal) {
        this.setState({
          isLoading: false,
          //error
        });
      }
    }
  }

  async addEmergency(create, params) {
    if (create) {
      try {
        await createEmergency({ ...params });
      } catch (e) {
        console.log("error creating employee", e);
      }
    }
  };

  componentDidMount() {
    this.signal = true;
    this.getUsers();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderEmergencies(emergencies) {
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
      />
    );
  }

  render() {
    const { classes } = this.props;

    const { emergencies } = this.state;

    return (
      <DashboardLayout title="Emergencies">
        <div className={classes.root}>
          <EmergencyToolbar createEmployee={this.addEmergency} />
          <div className={classes.content}>{this.renderEmergencies(emergencies)}</div>
        </div>
      </DashboardLayout>
    );
  }
}

Emergencies.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Emergencies);
