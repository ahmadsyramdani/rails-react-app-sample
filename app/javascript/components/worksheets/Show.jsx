import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = { worksheet: {} };
  }

  componentDidMount() {
    console.log(this.props)
    if (localStorage.getItem('token') && this.props.loggedIn) {
      const {
        match: {
          params: { id }
        }
      } = this.props;

      const url = `/api/v1/worksheets/show/${id}`;

      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      axios.get(url, {
        headers: {
          'X-CSRF-Token': csrf,
          'ContentType': 'application/json',
          'Accept': 'application/json',
          'Autorization': 'Bearer ' + localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState({ worksheet: response.data });
      }).catch(error => {
        console.log("check detail error", error);
      })
    } else {
      this.props.history.push('/')
    }
  }

  checkCurrentUser() {
    if ( !this.props.loggedIn ) {
      this.props.history.push('/')
    }
  }

  componentDidUpdate() {
    this.props.checkLoginStatus
    this.checkCurrentUser()
  }

  render() {
    const { worksheet } = this.state;
    const deleteLink = (
      <Link to="#_" className="btn btn-danger mb-2" onClick={this.props.handleDelete}>
        Delete
      </Link>
    )
    return (
      <>
        <div className="py-5">
          <main className="container">
            <div className="row">
              <div className="col-8">
                <div className="card">
                  <h5 className="card-header">Detail</h5>
                  <div className="card-body">
                    <h5 className="card-title">{worksheet.title}</h5>
                    <p className="card-text">{worksheet.description}</p>
                    <ul className="list-group mb-4">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Number of Question
                        <span className="badge badge-primary badge-pill">{worksheet.number_of_question}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Total Score
                        <span className="badge badge-primary badge-pill">{worksheet.total_score}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Obtained Score
                        <span className="badge badge-primary badge-pill">{worksheet.obtained_score}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="user">
                  <h3> Hello { this.props.isAdmin ? 'Admin' : 'User' }</h3>
                </div>
                { this.props.isAdmin ? deleteLink : '' }
                <br />
                <Link to="/worksheets" className="btn custom-button mb-2">
                  Back
                </Link>
                <br />
                <Link to="#_" className="btn custom-button" onClick={this.props.handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default Show;
