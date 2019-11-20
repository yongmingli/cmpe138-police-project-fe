// Externals
import classNames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PerfectScrollbar from "react-perfect-scrollbar";

// Material helpers
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
  Tooltip
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { EditRounded } from "@material-ui/icons";

import { getUser } from "../../../../redux/selectors";

// Shared components
import { Portlet, PortletContent } from "../../../../components";
// Component styles
import styles from "./styles";
import ViewEmergencyModal from "views/Emergencies/ViewEmergencyModal";
import AddNoteDialog from "views/Emergencies/components/AddNoteDialog";

class EmergencyTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };

  handleChangePage = (_, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, emergencies, user, refresh } = this.props;
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
                  <TableCell align="left">Actions</TableCell>
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
                        {moment(emergency.started_at).format(
                          "YYYY/MM/DD hh:mm"
                        )}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {emergency.lead_responder
                          ? emergency.lead_responder
                          : "None Assigned"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <ViewEmergencyModal
                          emergency={emergency}
                          onClose={action => {
                            if (action) {
                              refresh();
                            }
                          }}
                        />
                        <AddNoteDialog
                          onClose={refresh}
                          emergency={emergency}
                          user={user}
                        />
                        {user.type === "CALL_OPERATOR" ? (
                          <Tooltip title="Edit Emergency">
                            <IconButton
                              className={classes.button}
                              aria-label="edit emergency"
                              onClick={() => {
                                alert("hi");
                              }}
                            >
                              <EditRounded />
                            </IconButton>
                          </Tooltip>
                        ) : null}
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

const mapStateToProps = state => {
  return getUser(state);
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(EmergencyTable);
