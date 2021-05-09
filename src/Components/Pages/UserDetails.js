import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

class UserDetails extends Component {
  state = {
    ll: "afasa",
    user_details: {},
    auth: false,
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/api_view/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => this.setState({ user_details: res.data, auth: true }))
      .catch((err) => {
        console.log(err);
      });
  }
  alertuser = () => {
    return window.alert("Not LoggedIn. Wanna Login?");
  };

  render() {
    return (
      <div>
        {this.props.userLoggedIn ? (
          <React.Fragment>
            {console.log(this.state.user_details)}
            Email: {this.state.user_details.email}
            <br />
            First Name: {this.state.user_details.first_name}
            <br />
            Last Name: {this.state.user_details.last_name}
            <br />
            Username: {this.state.user_details.username}
            <br />
            Date Joined: {this.state.user_details.date_joined}
            <br />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Alert variant="danger" style={{ textAlign: "center" }}>
              Unauthorized to access these page.{" "}
              <Alert.Link href="/login">Login</Alert.Link> to access.
            </Alert>
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    id: state.id,
    userLoggedIn: state.userLoggedIn,
  };
};
export default connect(mapStateToProps, null)(UserDetails);
