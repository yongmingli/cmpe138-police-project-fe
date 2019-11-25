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
import AddEmergencyDialog from "../AddEmergencyDialog";

class EmergencyToolbar extends Component {

  render() {
    const { classes, className, search, user } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search emergencies"
            onChange={event => search(event.target.value)}
          />
          <span className={classes.spacer} />
          { user.type === "CALL_OPERATOR" ? <AddEmergencyDialog onClose={this.props.createEmergency} /> : null}

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
