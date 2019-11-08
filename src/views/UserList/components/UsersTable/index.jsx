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

// Shared helpers
import { getInitials } from "helpers";

// Shared components
import { Portlet, PortletContent } from "components";

// Component styles
import styles from "./styles";

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
    const { classes, className, employees } = this.props;
    const { activeTab, rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">EID</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Date of Birth</TableCell>
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
  employees: [],
  onShowDetails: () => {}
};

export default withStyles(styles)(UsersTable);
