import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Shared components
import { SearchInput } from "../../../../components";

import { AddEmergencyDialog } from "../index";

// Component styles
import styles from "./styles";

class EmergencyToolbar extends Component {
  // handleSearch = params => {
  //   console.log(params.target);
  // };

  handleSearch(event) {
    console.log(event.target.value); // TESTING
    //search(event.target.value);
    this.setState({ value: event.target.value });
  }

  render() {
    const { classes, className, search } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            //        value={this.state.value}
            className={classes.searchInput}
            placeholder="Search emergencies"
            onChange={event => search(event.target.value)}
          />
          <span className={classes.spacer} />
          <AddEmergencyDialog onClose={this.props.createEmergency} />
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
