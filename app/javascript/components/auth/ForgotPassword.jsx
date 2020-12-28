import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      forgotErrors: "",
      forgotSuccess: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
    const {
      email
    } = this.state
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    axios.post("/users/forgot_password", { email: email },
    {
      headers: {
        'X-CSRF-Token': csrf
      }
    }).then(response => {
      if (response.data.failure)  {
        this.setState({
          forgotSuccess: "",
          forgotErrors: response.data.failure
        })
      } else {
        this.setState({
          forgotErrors: "",
          forgotSuccess: response.data.message
        })
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
              <h5 className="card-title text-center">Forgot Password</h5>
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
                <button type="submit">Reset Password</button>
                <hr className="my-4" />
                <Link to="/" className="">
                  Login
                </Link>
                {
                  this.state.forgotErrors ?
                  <div className="alert alert-danger" role="alert">
                    { this.state.forgotErrors }
                  </div> :
                  ''
                }

                {
                  this.state.forgotSuccess ?
                  <div className="alert alert-success" role="alert">
                    { this.state.forgotSuccess }
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
