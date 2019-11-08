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
import { getEmployees } from "../../services/user";

// Custom components
import { UsersToolbar, UsersTable } from "./components";

// Component styles
import styles from "./style";

class UserList extends Component {
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
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getUsers();
  }

  componentWillUnmount() {
    this.signal = false;
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
      <UsersTable
        //
        employees={employees}
      />
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Employees">
        <div className={classes.root}>
          <UsersToolbar getUsers={this.getUsers}/>
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
