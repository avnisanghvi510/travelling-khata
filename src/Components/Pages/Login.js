import React from "react";
// import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
// import { Form, Input, Button } from 'antd';
// import Icon from '@ant-design/icons';
import { connect } from "react-redux";
// import { NavLink } from 'react-router-dom';
import * as actions from "../store/actions/auth";
import { Link } from "react-router-dom";

// const FormItem = Form.Item;
// const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import "./Login.css";

class NormalLoginForm extends React.Component {
  state = {
    values: { username: "", password: "" },
  };

  componentDidMount() {
    actions.authCheckState();
    if (this.props.isAuthenticated) {
      return (
        <div>
          <Redirect to="/" />
        </div>
      );
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.props.history)
    this.props.onAuth(this.state.values.username, this.state.values.password);
  };
  isauth = () => {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
  };

  inputChanged = (event) => {
    const cred = this.state.values;
    cred[event.target.name] = event.target.value;
    this.setState({ values: cred });
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <Alert style={{ textAlign: "center" }} variant="danger">
          {console.log(this.props.error)}
          
        </Alert>
      );
    }
    // const responseFacebook = (response) => {
    //   console.log(response);
    //   this.props.onFacebookLogin(response.accessToken);
    // };
    const responseGoogle = (response) => {
      console.log(response);
      this.props.onGoogleLogin(response.accessToken);
    };
    const responseFailed = () => {};

    // const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {console.log(this.props.userLoggedIn)}
        {this.props.userLoggedIn ? (
          <React.Fragment>
            {window.alert("Already Logged in. Visit home")}
            <Redirect to="/" />
          </React.Fragment>
        ) : (
          <div
            style={{ padding: "10% 2px 10% 2px", backgroundColor: "skyblue" }}
          >
            <center>
              <div>
                {this.props.location.aboutProps ? (
                  this.props.location.aboutProps.name
                ) : (
                  <></>
                )}
              </div>
              <Card bg={"dark"} text={"white"} className="mb-2 login-card">
                <Card.Body>
                  {errorMessage}
                  {this.props.loading ? (
                    <React.Fragment>
                      <h1 style={{ color: "white" }}>Logging In...</h1>
                      <br />
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    </React.Fragment>
                  ) : (
                    <div>
                      <h1 className="heading" style={{ color: "white" }}>
                        Login Here
                      </h1>
                      <br />
                      <Form onSubmit={this.handleSubmit}>
                        <center>
                          <Form.Group
                            as={Row}
                            className="justify-content-md-center"
                            controlId="formBasicUsername"
                          >
                            <Form.Label>Username:{"  "}</Form.Label>
                            <Col xs lg="6">
                              <Form.Control
                                type="text"
                                name="username"
                                value={this.state.values.username}
                                onChange={this.inputChanged}
                                placeholder="Enter your Username"
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group
                            as={Row}
                            className="justify-content-md-center"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Password: </Form.Label>
                            <Col xs lg="6">
                              <Form.Control
                                name="password"
                                type="password"
                                onChange={this.inputChanged}
                                value={this.state.values.password}
                                placeholder="Password"
                              />
                            </Col>
                          </Form.Group>
                        </center>
                        <Button
                          variant="primary"
                          className="login-btn"
                          type="submit"
                        >
                          Login
                        </Button>
                        {"   "}
                        or {"  "}{" "}
                        <Link to="/signup" className="borderLeftRight">
                          Register
                        </Link>
                      </Form>

                      <GoogleLogin
                        clientId="1053020320765-8im5h5ijocnpti12htim3c56bqv8mucu.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        onFailure={responseFailed}
                      />
                    </div>
                  )}
                </Card.Body>
              </Card>
            </center>
          </div>
        )}
      </div>
    );
  }
}

// const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => {
  console.log("loginstate", state);
  return {
    loading: state.loading,
    error: state.error,
    id: state.id,
    userLoggedIn: state.userLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),

    onFacebookLogin: (accessToken) =>
      dispatch(actions.facebookLogin(accessToken)),
    onGoogleLogin: (accessToken) => dispatch(actions.googleLogin(accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
