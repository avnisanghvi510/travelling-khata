import React, {useEffect}from "react";
import Navbar from "./Components/Layout/Navbar";
import {connect} from 'react-redux';
import "./App.css";
import * as actions from './Components/store/actions/auth'
import Home from "./Components/Pages/Home";
import ContactUs from "./Components/Pages/ContactUs";
import Places from "./Components/Pages/Places";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import LogOut from "./Components/Pages/Logout";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import friendlist from "./Components/chat/friendlist";

// import Services from "./components/layout/pages/Services";
// import Products from "./components/layout/pages/Products";
// import ContactUs from "./components/pages/ContactUs";
// import SignUp from "./components/pages/SignUp";
// import Marketing from "./components/pages/Marketing";
// import Consulting from "./components/pages/Consulting";

function App(props) {
  useEffect(()=> {
    props.onTryAutoSignup()
  })
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/places" exact component={Places} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/logout" exact component={LogOut} />
        <Route path="/contactus" exact component={ContactUs} />
        <Route path="/chats" exact component={friendlist} />

        {/* <Route path="/services" component={Services} />
        <Route path="/products" component={Products} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/marketing" component={Marketing} />
        <Route path="/consulting" component={Consulting} /> */}
      </Switch>
    </Router>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
