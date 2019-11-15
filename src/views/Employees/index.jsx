import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { CircularProgress, Typography } from "@material-ui/core";

// Shared layouts
import { Dashboard as DashboardLayout } from "layouts";

// Shared services
import { createEmployee, getEmployees } from "../../services/user";

// Custom components
import { EmployeesToolbar, EmployeesTable, AddEmployeeDialog } from "./components";

// Component styles
import styles from "./style";
import { SearchInput } from "../../components";

// TODO: refresh table when employee is created.

class Employees extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    employees: [],
    error: null
  };

  async getUsers() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state; // TODO add pagination

      const { employees } = await getEmployees(/*limit*/); // TODO add pagination

      if (this.signal) {
        this.setState({
          isLoading: false,
          employees
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

  async addEmployee(create, params) {
    if (create) {
      try {
        await createEmployee({ ...params });
        this.getUsers();
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

  renderUsers(employees) {
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

    if (employees.length === 0) {
      return <Typography variant="h6">There are no employees</Typography>;
    }

    return (
      <EmployeesTable
        employees={employees}
      />
    );
  }

  render() {
    const { classes } = this.props;

    const { employees } = this.state;

    return (
      <DashboardLayout title="Employees">
        <div className={classes.root}>
          <EmployeesToolbar createEmployee={this.addEmployee} />
          <div className={classes.content}>{this.renderUsers(employees)}</div>
        </div>
      </DashboardLayout>
    );
  }
}

Employees.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Employees);
