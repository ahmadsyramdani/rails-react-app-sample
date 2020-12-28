import React from "react";
import Home from "../components/Home";
import WorksheetIndex from "../components/worksheets/Index";
import WorksheetShow from "../components/worksheets/Show";
import Register from "../components/users/Register";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: {},
      isAdmin: false,
      loggedIn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  checkLoginStatus() {
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    axios.get("/user_is_authed", {
      headers: {
        'X-CSRF-Token': csrf,
        'ContentType': 'application/json',
        'Accept': 'application/json',
        'Autorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
    .then(response => {
      console.log(response.data)
      if ( response.data.logged_in ) {
        this.setState({
          currentUser: response.data.user,
          isAdmin: response.data.is_admin,
          loggedIn: response.data.logged_in
        });
      } else {
        this.setState({
          currentUser: {},
          isAdmin: false,
          loggedIn: false
        });
      }
    })
    .catch(error => {
      console.log("check login error", error);
    });
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  handleLogin(data) {
    localStorage.setItem("token", data.jwt)
    this.checkLoginStatus()
  }

  handleLogout() {
    localStorage.removeItem("token")
    this.setState({
      currentUser: {},
      isAdmin: false,
      loggedIn: false
    });
  }

  handleCreate() {
    alert('Worksheet created')
  }

  handleDelete() {
    alert('Worksheet deleted')
  }

  render() {
    return (
      <>
      <Router>
        <Switch>
          <Route
            exact
            path={"/"}
            render={props => (
              <Home
                {...props}
                checkLoginStatus={this.checkLoginStatus}
                handleLogin={this.handleLogin}
                currentUser={this.state.currentUser}
                isAdmin={this.state.isAdmin}
                loggedIn={this.state.loggedIn}
              />
            )}
          />
          <Route
            exact
            path={"/worksheets"}
            render={props => (
              <WorksheetIndex
                {...props}
                checkLoginStatus={this.checkLoginStatus}
                currentUser={this.state.currentUser}
                isAdmin={this.state.isAdmin}
                loggedIn={this.state.loggedIn}
                handleLogout={this.handleLogout}
                handleCreate={this.handleCreate}
              />
            )}
          />
          <Route
            exact
            path={"/worksheets/:id"}
            render={props => (
              <WorksheetShow
                {...props}
                checkLoginStatus={this.checkLoginStatus}
                currentUser={this.state.currentUser}
                isAdmin={this.state.isAdmin}
                loggedIn={this.state.loggedIn}
                handleLogout={this.handleLogout}
                handleDelete={this.handleDelete}
              />
            )}
          />
          <Route
            exact
            path={"/register"}
            render={props => (
              <Register
                {...props}
                handleLogin={this.handleLogin}
                loggedIn={this.state.loggedIn}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          <Route
            path="/forgot_password"
            exact
            render={props => (
              <ForgotPassword
                {...props}
                handleLogin={this.handleLogin}
                loggedIn={this.state.loggedIn}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          <Route
            path="/reset_password/:token"
            render={props => (
              <ResetPassword
                {...props}
                handleLogin={this.handleLogin}
                loggedIn={this.state.loggedIn}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
        </Switch>
      </Router>
      </>
    )
  }
}
