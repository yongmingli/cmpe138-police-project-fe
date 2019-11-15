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
import AddEmergencyDialog from "../AddEmergencyDialog";

class EmergencyToolbar extends Component {

  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search emergencies"
          />
          <span className={classes.spacer} />
          <AddEmergencyDialog onClose={this.props.createEmergency}/>
        </div>
      </div>
    );
  }
}

EmergencyToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  createEmergency: PropTypes.func
};

export default withStyles(styles)(EmergencyToolbar);
