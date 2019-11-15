import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Shared components
import { SearchInput } from "../../../../components";

// Component styles
import styles from "./styles";
import { AddEmployeeDialog } from "../index";

class EmployeesToolbar extends Component {

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
          <AddEmployeeDialog onClose={this.props.createEmployee}/>
        </div>
      </div>
    );
  }
}

EmployeesToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  createEmployee: PropTypes.func
};

export default withStyles(styles)(EmployeesToolbar);
