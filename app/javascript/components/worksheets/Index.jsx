import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worksheets: []
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token') && this.props.loggedIn) {
      const url = "/api/v1/worksheets/index";

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
        this.setState({ worksheets: response.data });
      }).catch(error => {
        console.log("check list error", error);
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
    this.checkCurrentUser()
  }

  render() {
    const { worksheets } = this.state;
    const allWorksheets = worksheets.map((worksheet, index) => (
      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
        <Link to={`/worksheets/${worksheet.id}`}>{worksheet.title}</Link>
        <span className="badge badge-primary badge-pill">{worksheet.obtained_score}</span>
      </li>
    ));
    const noWorksheet = (
      <h4>
        No worksheets yet
      </h4>
    );
    const newWorksheetLink = (
      <Link to="#_" className="btn btn-primary mb-2" onClick={this.props.handleCreate}>
        Create New worksheet
      </Link>
    )

    return (
      <>
        <div className="py-5">
          <main className="container">
            <div className="row">
              <div className="col-8">
                {worksheets.length > 0 ?
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <b>Title</b>
                      <span className="badge badge-primary badge-pill">Obtained Score</span>
                    </li>
                    {allWorksheets}
                  </ul> :
                noWorksheet}
              </div>
              <div className="col-4">
                <div className="user">
                  <h3> Hello { this.props.isAdmin ? 'Admin' : 'User' }</h3>
                </div>
                { this.props.isAdmin ? newWorksheetLink : '' }
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
export default Index;
