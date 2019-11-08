import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";
import validate from "validate.js";

// Material helpers
import { CircularProgress, Typography, withStyles } from "@material-ui/core";

// Material components
import { Button, TextField } from "@material-ui/core";

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from "../../../../components";

// Component styles
import styles from "./styles";
import schema from "./schema";
import { updateUser } from "../../../../services/user";
import { compose } from "redux";
import { connect } from "react-redux";
import { loginRedux } from "../../../../redux/actions";

// Service methods
const updateProfile = async values => {
  const res = await updateUser(values);

  if (!res.status) {
    throw new Error(res.error);
  } else {
    return res;
  }
};

class AccountDetails extends Component {
  state = {
    values: {
      fname: "",
      lname: "",
      username: "",
      zipCode: ""
    },
    touched: {
      fname: false,
      lname: false,
      username: false,
      zipCode: false
    },
    errors: {
      fname: null,
      lname: null,
      username: null,
      zipCode: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  };

  validateForm = () => {
    const { values, touched } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};

    // no errors and there has been a change in value
    newState.isValid = !errors && Object.values(touched).indexOf(true) > -1;

    this.setState(newState);
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleUpdateProfile = async () => {
    try {
      const { values } = this.state;

      this.setState({ isLoading: true });
      const res = await updateProfile(values);

      this.setState({ isLoading: false, submitError: null });
      this.props.loginRedux(res.data.user);
    } catch (error) {
      this.setState({
        isLoading: false,
        submitError: error.toString()
      });
    }
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      values: {
        id: nextProps.user.e_id,
        fname: nextProps.user.fname,
        lname: nextProps.user.lname,
        username: nextProps.user.username
      }
    });
  }

  render() {
    const { classes, className, loginRedux, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    const {
      values,
      touched,
      errors,
      isValid,
      submitError,
      isLoading
    } = this.state;

    const showFirstNameError =
      touched.fname && errors.fname ? errors.fname[0] : false;
    const showLastNameError =
      touched.lname && errors.lname ? errors.lname[0] : false;
    const showUsernameError =
      touched.username && errors.username ? errors.username[0] : false;

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel title="Profile" />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="First name"
                margin="dense"
                required
                onChange={e =>
                  this.handleFieldChange("fname", e.target.value)
                }
                value={values.fname}
                variant="outlined"
              />
              {showFirstNameError && (
                <Typography className={classes.fieldError} variant="body2">
                  {errors.firstName[0]}
                </Typography>
              )}
              <TextField
                className={classes.textField}
                label="Last name"
                margin="dense"
                required
                onChange={e =>
                  this.handleFieldChange("lname", e.target.value)
                }
                value={values.lname}
                variant="outlined"
              />
              {showLastNameError && (
                <Typography className={classes.fieldError} variant="body2">
                  {errors.lastName[0]}
                </Typography>
              )}
              <TextField
                className={classes.textField}
                label="Username"
                margin="dense"
                required
                onChange={e => this.handleFieldChange("username", e.target.value)}
                value={values.username}
                variant="outlined"
              />
              {showUsernameError && (
                <Typography className={classes.fieldError} variant="body2">
                  {errors.username[0]}
                </Typography>
              )}
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Zip Code"
                margin="dense"
                onChange={e => this.handleFieldChange("zipCode", e.target.value)}
                value={values.zipCode}
                variant="outlined"
              />
              {submitError && (
                <Typography className={classes.fieldError} variant="body2">
                  {submitError}
                </Typography>
              )}
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          {isLoading ? (
            <CircularProgress className={classes.progress} />
          ) : (
            <Button
              color="primary"
              variant="contained"
              disabled={!isValid}
              onClick={this.handleUpdateProfile}
            >
              Update profile
            </Button>
          )}
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountDetails.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};


export default compose(
  connect(
    null,
    { loginRedux }
  ),
  withStyles(styles)
)(AccountDetails);
