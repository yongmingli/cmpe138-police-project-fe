import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { getUser } from "../../../../../../redux/selectors";
import { compose } from "redux";

const SideBarItem = ({ text, icon, to, employeeTypes, user, classes }) => {
  return (
    employeeTypes.includes("ANY") || employeeTypes.includes(user.type) ?
      (<ListItem
        activeClassName={classes.activeListItem}
        className={classes.listItem}
        component={NavLink}
        to={to}
      >
        <ListItemIcon className={classes.listItemIcon}>
          {icon}
        </ListItemIcon>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={text}
        />
      </ListItem>) : null
  );
};


const mapStateToProps = state => {
  return getUser(state);
};

export default compose(
  connect(mapStateToProps)
)(SideBarItem);
