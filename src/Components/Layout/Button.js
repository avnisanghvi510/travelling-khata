import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './Button.css';

class Button extends Component {
  render() {
    return (
      <div>
        {this.props.userLoggedIn ? (
          <Link to="/logout" className="bttn">
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login" className="bttn">
              Login
            </Link>
            {"\u00a0"}
            {"\u00a0"}
            <Link to="/signup" className="bttn">
              SignUp
            </Link>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("loginstate", state);
  return {
    userLoggedIn: state.userLoggedIn,
  };
};
export default connect(mapStateToProps, null)(Button);
