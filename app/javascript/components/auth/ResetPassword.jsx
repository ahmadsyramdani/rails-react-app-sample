import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      forgotErrors: "",
      forgotSuccess: "",
      resetToken: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
    const {
      password
    } = this.state
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    axios.post("/users/reset_password", { password: password, token: this.state.resetToken },
    {
      headers: {
        'X-CSRF-Token': csrf
      }
    }).then(response => {
      if (response.data.failure)  {
        this.props.history.push(`/reset_password/${this.state.resetToken}`)
      } else {
        this.props.history.push('/')
      }
    }).catch(error => {
      console.log('reset password error', error);
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

  componentDidMount() {
    const {
      match: {
        params: { token }
      }
    } = this.props;

    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    axios.get(`/users/check_reset_token/${token}`, {
      headers: {
        'X-CSRF-Token': csrf,
        'ContentType': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if ( response.data.failure ) {
        this.props.history.push('/forgot_password')
      } else {
        this.setState({
          resetToken: token
        })
      }
    })
    .catch(error => {
      console.log("check token error", error);
    });
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
              <h5 className="card-title text-center">Reset Password</h5>
              <form onSubmit={this.handleSubmit}>
                <div className="form-label-group mb-2">
                  <label htmlFor="inputPassword">New Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="New Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required />
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
