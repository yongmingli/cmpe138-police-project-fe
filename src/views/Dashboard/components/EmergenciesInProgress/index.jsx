import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Typography } from "@material-ui/core";

// Material icons
import {
  ArrowDownward as ArrowDownwardIcon,
  Money as MoneyIcon
} from "@material-ui/icons";

// Shared components
import { Paper } from "../../../../components";

// Component styles
import styles from "./styles";

class EmergenciesInProgress extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper {...rest} className={rootClassName}>
        <div className={classes.content}>
          <div className={classes.details}>
            <Typography className={classes.title} variant="body2">
              EMERGENCIES IN PROGRESS
            </Typography>
            <Typography className={classes.value} variant="h3">
              200
            </Typography>
          </div>
          <div className={classes.iconWrapper}>
            <MoneyIcon className={classes.icon} />
          </div>
        </div>
        <div className={classes.footer} href="#test123">
          <Typography className={classes.caption} variant="caption">
            View emergencies
          </Typography>
        </div>
      </Paper>
    );
  }
}

EmergenciesInProgress.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmergenciesInProgress);
