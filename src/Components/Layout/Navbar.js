import React, { useState } from "react";
import Button  from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Dropdown from "./Dropdown";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


function Navbar(props) {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className="nvb sticky-top">
        <a href="#page-top" className="nvlg" onClick={closeMobileMenu}>
          {" "}
          Travel Khata
        </a>

        <i class="fab fa-firstdraft" />

        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fa fa-times" : "fa fa-bars"} />
        </div>
        <ul className={click ? "nvm active" : "nvm"}>
          <li className="nvt">
            <Link to="/" className="nvl" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          {props.userLoggedIn ? (
            <li className="nvt">
              <Link to="/places" className="nvl" onClick={closeMobileMenu}>
                Places
              </Link>
            </li>
          ) : (
            <li className="nvt">
              <Link
                to={{
                  pathname: "/login",
                  aboutProps: {
                    name: "You need to login first.",
                  },
                }}
                className="nvl"
                onClick={closeMobileMenu}
              >
                Places
              </Link>
            </li>
          )}
          <li className="nvt">
            {/* <a href="#contact" >Contact Us</a> */}
            <Link to="/contactus" className="nvl" onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </li>
          {props.userLoggedIn ? (
            <li>
              <Link
                to="/logout"
                className="nvl-mobile"
                onClick={closeMobileMenu}
              >
                LogOut
              </Link>
            </li>
          ) : (
            <div>
              <li>
                <Link
                  to="/login"
                  className="nvl-mobile"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="nvl-mobile"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </li>
            </div>
          )}
        </ul>
        <Button />
      </nav>
    </>
  );
}
const mapStateToProps=(state)=>{
  return{
    userLoggedIn: state.userLoggedIn
  }
}

export default connect(mapStateToProps, null)(Navbar);
