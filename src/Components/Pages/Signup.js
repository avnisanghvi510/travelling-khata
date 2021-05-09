import React from "react";
// import { Form, Input, Icon, Button } from 'antd';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/auth";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
// const FormItem = Form.Item;
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Signup.css";
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    userSignedUp: false,
    values: { username: "", email: "", password: "", confirm: "" },
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.props.onAuth(
      this.state.values.username,
      this.state.values.email,
      this.state.values.password,
      this.state.values.confirm
    );
    // this.props.history.push('/');
  };
  setFalse = () => {
    this.state.userSignedUp = false;
    this.success = false;
  };
  inputChanged = (event) => {
    const cred = this.state.values;
    cred[event.target.name] = event.target.value;
    this.setState({ values: cred });
  };

  render() {
    // const { getFieldDecorator } = this.props.form;
    let errorMessage = null;
    let success_msg = null;
    let success = false;
    if (this.props.error) {
      console.log(this.props.error);
      // console.log('err',this.props.error.response.data.non_field_errors)
      errorMessage = (
        <Alert style={{ textAlign: "center" }} variant="danger">
          {" "}
          {[
            this.props.error.response.data.username,
            this.props.error.response.data.email,
            this.props.error.response.data.error_description,
            this.props.error.response.data.password1,
            this.props.error.response.data.non_field_errors,
          ]}{" "}
          ;
        </Alert>
      );
    }
    if (this.props.userSignedUp) {
      console.log("user", this.props.userSignedUp);
      this.success = true;
      this.state.userSignedUp = true;
      success_msg = (
        <Alert style={{ textAlign: "center" }} variant="success">
          <p>
            Signup Successful.{" "}
            <b>
              <Link to="/login">Login Here</Link>
            </b>
          </p>
        </Alert>
      );
    }
    return (
      <div style={{ padding: "10% 2px 10% 2px", backgroundColor: "skyblue" }}>
        <center>
          {this.props.userLoggedIn ? (
            <h1>You are already logged in.</h1>
          ) : (
            <Card
              bg={"dark"}
              text={"white"}
              style={{ width: "30rem", borderRadius: "5%" }}
              className="justify-content-md-center signup-form"
            >
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
                ) : this.success ? (
                  <div>
                    {success_msg}
                    {this.setFalse()}
                  </div>
                ) : (
                  <div>
                    <h1 style={{ color: "white" }} className="heading">
                      Register Here...
                    </h1>
                    <br />
                    <Form onSubmit={this.handleSubmit}>
                      <center>
                        {/* Username */}
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
                              required={true}
                              value={this.state.values.username}
                              onChange={this.inputChanged}
                              placeholder="Username"
                            />
                          </Col>
                        </Form.Group>
                        {/* Email */}
                        <Form.Group
                          as={Row}
                          className="justify-content-md-center"
                          controlId="formBasicEmail"
                        >
                          <Form.Label style={{ paddingLeft: "15px" }}>
                            Email :
                          </Form.Label>
                          <Col xs lg="6">
                            <Form.Control
                              type="email"
                              name="email"
                              required={true}
                              value={this.state.values.email}
                              onChange={this.inputChanged}
                              placeholder="Enter email.."
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group
                          as={Row}
                          className="justify-content-md-center"
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
                        <Form.Group
                          as={Row}
                          className="justify-content-md-center"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Re-enter: </Form.Label>
                          <Col xs lg="6">
                            <Form.Control
                              name="confirm"
                              type="password"
                              onChange={this.inputChanged}
                              value={this.state.values.confirm}
                              placeholder="Re-enter Password"
                            />
                          </Col>
                        </Form.Group>
                      </center>
                      <Button
                        variant="success"
                        className="login-btn"
                        type="submit"
                      >
                        SignUp
                      </Button>
                      {"   "}
                      or {"  "}{" "}
                      <Link to="/login" className="borderLeftRight">
                        Login
                      </Link>
                    </Form>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </center>
      </div>
    );
  }
}

// const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    userSignedUp: state.userSignedUp,
    userLoggedIn: state.userLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
    logout: () => dispatch(actions.logout()),
    afterSignUp: () => dispatch(actions.afterSignUp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

{
  /* {
        
            this.props.loading ? 
            <div>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            </div>
            :
            this.success ? 
            <div>
                
            </div>
            :
            <div>
            <h1>Login user form</h1>
            <form onSubmit={this.handleSubmit}>
            <label>
            Username:
            <input type="text" name="username" required={true} 
            value={this.state.values.username} 
            onChange={this.inputChanged}/>
            </label>
            <br/>
            <label>
            Email:
            <input type="email" name="email" required={true} 
            value={this.state.values.email} 
            onChange={this.inputChanged}/>
            </label>
            <br/>
            <label>
            Password:
            <input type="password" name="password"
            value={this.state.values.password}
            onChange={this.inputChanged} />
            </label>
            <br/>
            <label>
            Re-Password:
            <input type="password" name="confirm"
            value={this.state.values.confirm}
            onChange={this.inputChanged} />
            </label>
            <br/>
            <button type='submit' >Signup</button>
            </form>
            </div>
            } */
}
