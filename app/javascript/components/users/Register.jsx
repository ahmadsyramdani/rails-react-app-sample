import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      registrationErrors: "",
      registerSuccess: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
    const {
      email,
      password
    } = this.state
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    axios.post("/users", {
      user: {
        email: email,
        password: password
      }
    }, {
      headers: {
        'X-CSRF-Token': csrf
      }
    }).then(response => {
      if (response.data.failure)  {
        this.setState({
          registrationErrors: response.data.failure
        })
      } else {
        localStorage.setItem("token", response.data.jwt)
        localStorage.setItem("loggedIn", response.data.logged_in)
        this.props.history.push('/worksheets')
      }
    }).catch(error => {
      console.log('registration error', error);
    })
    e.preventDefault();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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
              <h5 className="card-title text-center">Register</h5>
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
                <button type="submit">Register</button>
                <hr className="my-4" />
                <Link to="/" className="">
                  Login
                </Link>
                {
                  this.state.registrationErrors ?
                  <div className="alert alert-danger" role="alert">
                    { this.state.registrationErrors }
                  </div> :
                  ''
                }

                {
                  this.state.registerSuccess ?
                  <div className="alert alert-success" role="alert">
                    { this.state.registerSuccess }
                  </div> :
                  ''
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
