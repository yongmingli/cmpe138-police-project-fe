import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Button, IconButton } from "@material-ui/core";

// Material icons
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";

// Shared components
import { DisplayMode, SearchInput } from "../../../../components";

// Component styles
import styles from "./styles";

class AccessRecordToolbar extends Component {
  render() {
    const { classes, className, selectedAccessRecords } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Button
            className={classes.exportButton}
            size="small"
            variant="outlined"
          >
            <ArrowUpwardIcon className={classes.exportIcon} />
            Export
          </Button>
          <Button color="primary" size="small" variant="outlined">
            Add
          </Button>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search access record"
          />
          <span className={classes.spacer} />
          <DisplayMode mode="list" />
        </div>
      </div>
    );
  }
}

AccessRecordToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedAccessRecords: PropTypes.array
};

AccessRecordToolbar.defaultProps = {
  selectedAccessRecords: []
};

export default withStyles(styles)(AccessRecordToolbar);
