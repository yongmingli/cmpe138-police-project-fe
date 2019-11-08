import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { loginRedux } from "../../redux/actions";

// Externals
import PropTypes from "prop-types";
import validate from "validate.js";

// Material components
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";

// Component styles
import styles from "./styles";

// Form validation schema
import schema from "./schema";

// Identity service
import { loginAuth } from "../../services/auth";

// Service methods
const signIn = async credentials => {
  const res = await loginAuth(credentials);
  console.log(res);
  if (!res.status) {
    throw new Error(res.error);
  } else {
    return res;
  }
};

class SignIn extends Component {
  state = {
    values: {
      login: "",
      password: ""
    },
    touched: {
      login: false,
      password: false
    },
    errors: {
      login: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  };

  validateForm = () => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = !errors;

    this.setState(newState);
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleSignIn = async () => {
    try {
      const { history } = this.props;
      const { values } = this.state;

      this.setState({ isLoading: true });

      const res = await signIn(values);
      const { jwt } = res.data;

      if (jwt) { // only redirect to dashboard if jwt is present
        localStorage.setItem("jwt", `Bearer ${jwt}`);

        history.push("/dashboard");
        this.props.loginRedux(res.data.employee);
      }
    } catch (error) {
      console.log(error);

      this.setState({
        isLoading: false,
        submitError: error.toString()
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      values,
      touched,
      errors,
      isValid,
      submitError,
      isLoading
    } = this.state;

    const showLoginError = touched.login && errors.login;
    const showPasswordError = touched.password && errors.password;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.content} item lg={12} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography className={classes.title} variant="h2">
                    Sign in
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Login"
                      name="login"
                      onChange={event =>
                        this.handleFieldChange("login", event.target.value)
                      }
                      type="text"
                      value={values.login}
                      variant="outlined"
                    />
                    {showLoginError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.login[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Password"
                      name="password"
                      onChange={event =>
                        this.handleFieldChange("password", event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    {showPasswordError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.password[0]}
                      </Typography>
                    )}
                  </div>
                  {submitError && (
                    <Typography className={classes.submitError} variant="body2">
                      {submitError}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  )}
                  <Typography className={classes.signUp} variant="body1">
                    Don't have an account?{" "}
                    <Link className={classes.signUpUrl} to="/sign-up">
                      Sign up
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  connect(
    null,
    { loginRedux }
  ),
  withStyles(styles)
)(SignIn);
