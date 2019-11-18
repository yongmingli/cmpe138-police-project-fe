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
import { getEmployees } from "../../../../services/user";
import { EmployeesTable } from "../../../Employees/components";

class DashboardAdmin extends Component {
  state = {
    isLoading: false,
    employees: []
  };

  async getUsers() {
    try {
      this.setState({ isLoading: true });
      const { employees } = await getEmployees(); // TODO add pagination

        this.setState({
          isLoading: false,
          employees
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
    this.getUsers();
  }

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, employees, error } = this.state;

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

    if (employees.length === 0) {
      return <Typography variant="h6">There are no employees</Typography>;
    }

    return (
      <EmployeesTable
        //
        employees={employees}
      />
    );
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

DashboardAdmin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardAdmin);
