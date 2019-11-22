import React, { Component } from "react";
import PropTypes from "prop-types";

// Material
import { withStyles } from "@material-ui/core";
import { CircularProgress, Typography } from "@material-ui/core";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Shared services
import {
  createEmergency,
  getEmergencies,
  updateEmergency,
  searchEmergency
} from "../../services/emergency";

// Custom components
import { EmergencyToolbar, EmergencyTable } from "./components";

// Component styles
import styles from "./style";

class Emergencies extends Component {
  state = {
    isLoading: false,
    limit: 10,
    emergencies: [],
    error: null
  };

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
      <DashboardLayout title="Emergencies">
        <div className={classes.root}>
          <EmergencyToolbar
            createEmergency={this.addEmergency.bind(this)}
            search={this.fetchEmergencies.bind(this)}
          />
          <div className={classes.content}>
            {this.renderEmergencies(emergencies)}
          </div>
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
