import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { CircularProgress, Typography } from "@material-ui/core";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Shared components
import { OrdersTable } from "../../components";

// Shared services
import { getOrders } from "../../services/order";

// Custom components
import { AccessRecordToolbar } from "./components";

// Component styles
import styles from "./style";

class AccessRecordList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    accessRecords: [],
    selectedAccessRecords: [],
    error: null
  };

  async getAccessRecords() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state;

      const { orders } = await getOrders(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          accessRecords: orders
        });
      }
    } catch (error) {
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
    this.getAccessRecords();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = selectedAccessRecords => {
    this.setState({ selectedAccessRecords });
  };

  renderAccessRecords() {
    const { classes } = this.props;
    const { isLoading, accessRecords, error } = this.state;

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

    if (accessRecords.length === 0) {
      return <Typography variant="h6">There are no access records</Typography>;
    }

    return <OrdersTable />;
  }

  render() {
    const { classes } = this.props;
    const { selectedAccessRecords } = this.state;

    return (
      <DashboardLayout title="Access Records">
        <div className={classes.root}>
          <AccessRecordToolbar selectedAccessRecords={selectedAccessRecords} />
          <div className={classes.content}>{this.renderAccessRecords()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

AccessRecordList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccessRecordList);
