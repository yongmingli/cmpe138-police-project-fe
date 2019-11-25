import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";
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
import { updateEmployee } from "../../../../services/user";

// Service methods
const updatePassword = async values => {
  await updateEmployee(values);
};

class Password extends Component {
  state = {
    values: {
      password: "",
      confirm: ""
    },
    touched: {
      password: false,
      confirm: false
    },
    errors: {
      password: null,
      confirm: null
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
      console.log(values);

      this.setState({ isLoading: true });
      await updatePassword({eid: values.id, ...values});

      this.setState({
        isLoading: false,
        submitError: null,
        values: {
          password: "",
          confirm: ""
        }
      });
    } catch (error) {
      console.log(error);
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
        firstName: nextProps.user.firstName,
        lastName: nextProps.user.lastName,
        email: nextProps.user.email,
        organization: nextProps.user.organization,
        title: nextProps.user.title
      }
    });
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);
    const {
      values,
      touched,
      errors,
      isValid,
      submitError,
      isLoading
    } = this.state;

    const showPasswordError =
      touched.password && errors.password ? errors.password[0] : false;
    const showConfirmError =
      touched.confirm && errors.confirm ? errors.confirm[0] : false;

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel title="Password" />
        </PortletHeader>
        <PortletContent>
          <form className={classes.form}>
            <TextField
              className={classes.textField}
              label="New Password"
              name="password"
              onChange={event =>
                this.handleFieldChange("password", event.target.value)
              }
              type="password"
              value={values.password}
              variant="outlined"
            />
            {showPasswordError && (
              <Typography className={classes.fieldError} variant="body2">
                {errors.password[0]}
              </Typography>
            )}
            <TextField
              className={classes.textField}
              label="Confirm new password"
              name="confirm"
              onChange={event =>
                this.handleFieldChange("confirm", event.target.value)
              }
              type="password"
              value={values.confirm}
              variant="outlined"
            />
            {showConfirmError && (
              <Typography className={classes.fieldError} variant="body2">
                {errors.confirm[0]}
              </Typography>
            )}
            {submitError && (
              <Typography className={classes.fieldError} variant="body2">
                {submitError}
              </Typography>
            )}
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
              Update password
            </Button>
          )}
        </PortletFooter>
      </Portlet>
    );
  }
}

Password.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Password);
