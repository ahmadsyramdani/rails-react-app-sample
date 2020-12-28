import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      loginSuccess: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    axios.post("/login",
      {
        email: email,
        password: password
      }, {
        headers: {
          'X-CSRF-Token': csrf
        }
      }
    )
    .then(response => {
      if (response.data.failure) {
        this.setState({
          loginErrors: response.data.failure
        })
      } else {
        this.props.handleLogin(response.data)
        this.props.history.push('/worksheets')
      }
    })
    .catch(error => {
      console.log("login error", error);
    });
    event.preventDefault();
  }

  checkCurrentUser() {
    if ( this.props.loggedIn ) {
      this.props.history.push('/worksheets')
    }
  }

  componentDidUpdate() {
    this.checkCurrentUser()
  }

  render() {
    return (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Worksheets</h1>
            <hr className="my-4" />
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-label-group mb-2">
                    <label htmlFor="inputEmail">Email address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      value={this.state.email}
                      onChange={this.handleChange}
                      autoComplete="off"
                      required
                      autoFocus />
                  </div>
                  <div className="form-label-group mb-2">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      autoComplete="off"
                      required />
                  </div>
                  <button type="submit">Login</button>
                  <hr className="my-4" />
                  <div className="navbar navbar mb-3">
                    <Link to="/register" className="">
                      Register
                    </Link> |
                    <Link to="/forgot_password" className="">
                      Forgot Password
                    </Link>
                  </div>
                  {
                    this.state.loginErrors ?
                    <div className="alert alert-danger" role="alert">
                      { this.state.loginErrors }
                    </div> :
                    ''
                  }

                  {
                    this.state.loginSuccess ?
                    <div className="alert alert-success" role="alert">
                      { this.state.loginSuccess }
                    </div> :
                    ''
                  }
                </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
