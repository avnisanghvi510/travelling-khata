// import Axios from "axios";
import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
export default class ContactUs extends Component {
  state = {
    values: { name: "", email: "", phone_number: "", message: "" },
  };

  onChange = (e) => {
    let state = this.state.values;
    console.log(e.target)
    state[e.target.name] = e.target.value;
    this.setState({ values: state });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.values)
    axios
      .post("http://127.0.0.1:8000/contactus/", {
        name: this.state.values.name,
        email: this.state.values.email,
        phone_number: this.state.values.phone_number,
        message: this.state.values.message,
      })
      .then((res) =>
        this.setState({
          values: { name: "", email: "", phone_number: "", message: "" },
        })
      )
      .then(()=>{window.alert('Message Sent Successfully..Our team will contact you soon.')})
      .catch((err)=> {console.log(err)});
  };
  render() {
    return (
      <body id="page-top">
        {console.log(this.state)}
        <section class="page-section" id="contact">
          <div class="container">
            <div class="text-center">
              <h2 class="section-heading text-uppercase">Contact Us</h2>
              <h3 class="section-subheading text-muted">
                Feel free to inform us in case of any mishappenings.
              </h3>
            </div>
            <form
              onSubmit={this.handleSubmit}
              id="contactForm"
              name="sentMessage"
              novalidate="novalidate"
            >
              <div class="row align-items-stretch mb-5">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      class="form-control"
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      required="required"
                      value={this.state.values.name}
                      onChange={this.onChange}
                      data-validation-required-message="Please enter your name."
                    />
                    <p class="help-block text-danger"></p>
                  </div>
                  <div class="form-group">
                    <input
                      class="form-control"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      required="required"
                      value={this.state.values.email}
                      onChange={this.onChange}
                      data-validation-required-message="Please enter your email address."
                    />
                    <p class="help-block text-danger"></p>
                  </div>
                  <div class="form-group mb-md-0">
                    <input
                      class="form-control"
                      id="phone"
                      type="tel"
                      name="phone_number"
                      placeholder="Your Phone *"
                      required="required"
                      onChange={this.onChange}
                      value={this.state.values.phone_number}
                      data-validation-required-message="Please enter your phone number."
                    />
                    <p class="help-block text-danger"></p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-group-textarea mb-md-0">
                    <textarea
                      class="form-control"
                      id="message"
                      placeholder="Your Message *"
                      required="required"
                      name="message"
                      value={this.state.values.message}
                      onChange={this.onChange}
                      data-validation-required-message="Please enter a message."
                    ></textarea>
                    <p class="help-block text-danger"></p>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <div id="success"></div>
                <button
                  class="btn btn-primary btn-xl text-uppercase"
                  id="sendMessageButton"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
        ;
        <footer class="footer py-4">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-4 text-lg-left">
                Copyright © Travel Khata 2020
              </div>
              <div class="col-lg-4 my-3 my-lg-0">
                <a class="btn btn-dark btn-social mx-2" href="#!">
                  <i class="fab fa-twitter"></i>
                </a>
                <a class="btn btn-dark btn-social mx-2" href="#!">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a class="btn btn-dark btn-social mx-2" href="#!">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
              <div class="col-lg-4 text-lg-right">
                <a class="mr-3" href="#!">
                  Privacy Policy
                </a>
                <a href="#!">Terms of Use</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    );
  }
}
