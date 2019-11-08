import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Avatar, Typography, Button } from "@material-ui/core";

// Shared components
import { Portlet, PortletContent, PortletFooter } from "components";

// Component styles
import styles from "./styles";
import { getUser } from "../../../../redux/selectors";
import { compose } from "redux";
import { connect } from "react-redux";

class AccountProfile extends Component {
  render() {
    const { classes, className, user, isFetching, dispatch, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{user.fname + " " + user.lname}</Typography>
              <Typography className={classes.username} variant="body1">
                {user.username}
              </Typography>
              <Typography className={classes.dateText} variant="body1">
                {user.createdAt}
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src="/images/avatars/avatar_4.png"
            />
          </div>
        </PortletContent>
        <PortletFooter>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text">
            Upload picture
          </Button>
          <Button variant="text">Remove picture</Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return getUser(state);
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(AccountProfile);
