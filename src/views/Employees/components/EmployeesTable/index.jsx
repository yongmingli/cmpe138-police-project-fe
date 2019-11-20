import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

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
  TablePagination,
  Tooltip,
  IconButton
} from "@material-ui/core";
import { EditRounded, VisibilityRounded } from "@material-ui/icons";

import { getUser } from "../../../../redux/selectors";

// Shared components
import { Portlet, PortletContent } from "../../../../components";

// Component styles
import styles from "./styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

class UsersTable extends Component {
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
    const { classes, className, employees, user } = this.props;
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
                Employees
              </Typography>
            </Toolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">EID</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">DOB</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Zip Code</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map(employee => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={employee.e_id}
                    >
                      <TableCell className={classes.tableCell}>
                        {`EMP${employee.e_id}`}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {employee.type}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {employee.username}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {`${employee.fname} ${employee.lname}`}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(employee.dob).format("YYYY/MM/DD")}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {employee.phone}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {employee.zipcode ? employee.zipcode : "N/A"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.type === "ADMIN" ? (
                          <Tooltip title="Edit Employee">
                            <IconButton
                              className={classes.button}
                              aria-label="edit employee"
                              onClick={() => {
                                alert("hi");
                              }}
                            >
                              <EditRounded />
                            </IconButton>
                          </Tooltip>
                        ) : null}
                        <Tooltip title="View Employee">
                          <IconButton
                            className={classes.button}
                            aria-label="view employee"
                            onClick={() => {
                              alert("hi");
                            }}
                          >
                            <VisibilityRounded />
                          </IconButton>
                        </Tooltip>
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
            count={employees.length}
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

UsersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onShowDetails: PropTypes.func,
  employees: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  employees: []
};

const mapStateToProps = state => {
  return getUser(state);
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(UsersTable);
