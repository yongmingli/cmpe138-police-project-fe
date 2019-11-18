import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from "@material-ui/core";

// Shared components
import { Portlet, PortletContent } from "../../../../components";

// Component styles
import styles from "./styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

class EmergencyTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, emergencies } = this.props;
    console.log(emergencies);
    const { rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Toolbar>
              <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
              >
                Emergencies
              </Typography>
            </Toolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">EID</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Zip Code</TableCell>
                  <TableCell align="left">Started At</TableCell>
                  <TableCell align="left">Lead Responder</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emergencies
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map(emergency => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={emergency.emergency_id}
                    >
                      <TableCell className={classes.tableCell}>
                        {`EMRG${emergency.emergency_id}`}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {emergency.status}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {emergency.zipcode}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(emergency.started_at).format("YYYY/MM/DD hh:mm")}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {emergency.lead_responder
                          ? emergency.lead_responder
                          : "None Assigned"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
          <TablePagination
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            component="div"
            count={emergencies.length}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

EmergencyTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onShowDetails: PropTypes.func,
  emergencies: PropTypes.array.isRequired
};

EmergencyTable.defaultProps = {
  emergencies: []
};

export default withStyles(styles)(EmergencyTable);
