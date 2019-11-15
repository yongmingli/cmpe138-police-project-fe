import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

// Material helpers
import { ThemeProvider } from "@material-ui/styles";

// Theme
import theme from "./theme";

// Styles
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";

// Routes
import Routes from "./Routes";

import { Provider } from "react-redux";
import store from "./redux/store";

// Browser history
const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}
