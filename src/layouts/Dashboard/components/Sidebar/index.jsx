import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { Link } from "react-router-dom";

// Externals
import classNames from "classnames";

import PropTypes from "prop-types";

// Material components
import { Avatar, CircularProgress, Divider, List, Typography, withStyles } from "@material-ui/core";

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  SettingsOutlined as SettingsIcon,
} from "@material-ui/icons";

// Component styles
import styles from "./styles";

import { SideBarItem } from "./components";

import { getUser } from "../../../../redux/selectors";

class Sidebar extends Component {
  render() {
    const { classes, className, user } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link className={classes.logoLink} to="/">
            <img
              alt="site logo"
              className={classes.logoImage}
              src="/images/connected_world.svg"
            />
          </Link>
        </div>
        <Divider className={classes.logoDivider}/>

        { user.type === undefined ? (
          <CircularProgress className={classes.progress} />
        ) : (
          <div className={classes.profile}>
            <Link to="/settings">
              <Avatar
                alt={user.username}
                className={classes.avatar}
                src="/images/avatars/avatar_3.png"
              />
            </Link>
            <Typography className={classes.nameText} variant="h6">
              {`${user.fname} ${user.lname}`}
            </Typography>
            <Typography className={classes.bioText} variant="caption">
              {user.type}
            </Typography>
          </div>
        ) }



        <Divider className={classes.profileDivider}/>
        <List component="div" disablePadding>
          <SideBarItem text="Dashboard"
                       to="/dashboard"
                       icon={<DashboardIcon/>}
                       employeeTypes={["ANY"]}
                       user={user}
                       classes={classes}
          />
          <SideBarItem text="Employees"
                       to="/employees"
                       icon={<DashboardIcon/>}
                       employeeTypes={["ADMIN"]}
                       user={user}
                       classes={classes}
          />
          <SideBarItem text="Emergencies"
                       to="/emergencies"
                       icon={<DashboardIcon/>}
                       employeeTypes={["POLICE_OFFICER", "CALL_OPERATOR"]}
                       user={user}
                       classes={classes}
          />
          <SideBarItem text="Settings"
                       to="/settings"
                       icon={<SettingsIcon/>}
                       employeeTypes={["ANY"]}
                       user={user}
                       classes={classes}
          />
        </List>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return getUser(state);
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Sidebar);
