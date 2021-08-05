import React, { useState} from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";
import { HashLink as Link } from "react-router-hash-link";
import { AiOutlineArrowUp } from 'react-icons/ai';
import LoginFormModal from "../auth/LoginForm";
import SignUpFormModal from "../auth/SignUpForm";
import loggedOutStyles from "./LoggedOutNavbar.module.css";
import styles from "../NavBar/NavBar.module.css";

const LoggedOutNavbar = () => {
  const [topOfPage, setTopOfPage] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const setLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const setSignupModal = () => {
    setShowSignupModal(!showSignupModal);
  };

  const backToTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <nav className={loggedOutStyles.navbar}>
      <ul className={`${styles.navbarLinks} ${loggedOutStyles.navbarLinks}`}>
        {/* <li>
          <NavLink
            smooth
            to="/#watch-us"
            exact
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
            exact
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
      {!topOfPage && (
        <button onClick={backToTop} className={`link-button icon-button ${loggedOutStyles.backToTopButton}`}>
          <Link smooth to="/" exact>
            <AiOutlineArrowUp />
          </Link>
        </button>
      )}
    </nav>
  );
};

export default LoggedOutNavbar;
