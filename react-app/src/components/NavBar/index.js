import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BannerPic } from "../../image/image";
import ProfileButton from "./ProfileButton";
import styles from "./NavBar.module.css";
import LoginFormModal from "../auth/LoginForm";
import SignUpFormModal from "../auth/SignUpForm";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const setLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const setSignupModal = () => {
    setShowSignupModal(!showSignupModal);
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink
            to="/tutorials"
            exact={true}
            className={styles.navLink}
            activeClassName="activeNavLink"
          >
            Tutorials
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about-us"
            exact={true}
            className={styles.navLink}
            activeClassName="activeNavLink"
          >
            About Us
          </NavLink>
        </li>
        <li>
          <ProfileButton
            sessionUser={sessionUser}
          />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink
            to="/"
            exact={true}
            className={styles.navLink}
            activeClassName="activeNavLink"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about-us"
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
      </>
    );
  }

  return (
    <nav>
      <div>
        <img src={BannerPic()} alt="" className={styles.banner} />
      </div>
      <ul className={styles.navbarLinks}>{sessionLinks}</ul>
    </nav>
  );
};

export default NavBar;
