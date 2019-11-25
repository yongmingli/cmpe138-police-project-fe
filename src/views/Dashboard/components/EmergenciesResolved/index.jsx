import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { CircularProgress, withStyles } from "@material-ui/core";

// Material components
import { Typography } from "@material-ui/core";

// Material icons
import { HomeOutlined as HomeOutlinedIcon } from "@material-ui/icons";

// Shared components
import { Paper } from "../../../../components";

// Component styles
import styles from "./styles";

class EmergenciesResolved extends Component {
  render() {
    const { classes, className, count, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper {...rest} className={rootClassName}>
        <div className={classes.content}>
          <div className={classes.details}>
            <Typography className={classes.title} variant="body2">
              EMERGENCIES RESOLVED
            </Typography>
            <Typography className={classes.value} variant="h3">
              { count ? count : <CircularProgress className={classes.progress} />}
            </Typography>
          </div>
          <div className={classes.iconWrapper}>
            <HomeOutlinedIcon className={classes.icon} />
          </div>
        </div>

      </Paper>
    );
  }
}

EmergenciesResolved.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmergenciesResolved);
