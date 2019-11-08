import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material icons
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";

// Shared components
import { SearchInput } from "../../../../components";

// Component styles
import styles from "./styles";
import { AddEmployeeDialog } from "../index";
import { createEmployee } from "../../../../services/user";

class UsersToolbar extends Component {
  async createEmployee(params) {
    try {
      this.setState({ isLoading: true });

      console.log(params);
      const { employee } = await createEmployee({...params});
      this.props.getUsers();
    } catch(e) {
      console.log("ERLERKLK", e);
    }
  };

  handleClose(create, params) {
    if (create) {
      createEmployee(params);
    }
  }

  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search employees"
          />
          <span className={classes.spacer} />
          <AddEmployeeDialog onClose={this.handleClose}/>
        </div>
      </div>
    );
  }
}

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  getUsers: PropTypes.func
};

UsersToolbar.defaultProps = {
  selectedUsers: []
};

export default withStyles(styles)(UsersToolbar);
