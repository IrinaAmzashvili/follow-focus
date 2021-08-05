import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import { NavHashLink as NavLink } from 'react-router-hash-link';
import LoginFormModal from "../auth/LoginForm";
import SignUpFormModal from "../auth/SignUpForm";
import loggedOutStyles from './LoggedOutNavbar.module.css';
import styles from "../NavBar/NavBar.module.css";

const LoggedOutNavbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const setLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const setSignupModal = () => {
    setShowSignupModal(!showSignupModal);
  };

  return (
    <nav className={loggedOutStyles.navbar}>
      <ul className={`${styles.navbarLinks} ${loggedOutStyles.navbarLinks}`}>
        {/* <li>
          <NavLink
            smooth
            to="/#watch-us"
            exact={true}
            className={styles.navLink}
            activeClassName="activeNavLink"
          >
            Watch Us
          </NavLink>
        </li> */}
        <li>
          <NavLink
            smooth
            to="/#about-us"
            exact={true}
            className={styles.navLink}
            activeClassName="activeNavLink"
          >
            About Us
          </NavLink>
        </li>
        <li>
          <LoginFormModal
            linkText={"Log In"}
            showLoginModal={showLoginModal}
            setLoginModal={setLoginModal}
            showSignupModal={showSignupModal}
            setSignupModal={setSignupModal}
          />
        </li>
        <li>
          <SignUpFormModal
            linkText={"Sign Up"}
            showLoginModal={showLoginModal}
            setLoginModal={setLoginModal}
            showSignupModal={showSignupModal}
            setSignupModal={setSignupModal}
          />
        </li>
      </ul>
    </nav>
  );
};

export default LoggedOutNavbar;
