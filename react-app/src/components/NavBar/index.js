
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BannerPic } from '../../image/image';
import ProfileButton from './ProfileButton';
import styles from './NavBar.module.css';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginForm';
import SignUpFormModal from '../auth/SignUpForm';


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink to='/tutorials' exact={true} className={styles.navLink} activeClassName='activeNavLink'>
            Tutorials
          </NavLink>
        </li>
        <li>
          <NavLink to='/about-us' exact={true} className={styles.navLink} activeClassName='activeNavLink'>
            About Us
          </NavLink>
        </li>
        <li>
          <ProfileButton sessionUser={sessionUser}/>
        </li>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink to='/' exact={true} className={styles.navLink} activeClassName='activeNavLink'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/about-us' exact={true} className={styles.navLink} activeClassName='activeNavLink'>
            About Us
          </NavLink>
          <LoginFormModal linkText={'Log In'}/>
        </li>
        <li>
          <SignUpFormModal linkText={'Sign Up'} />
        </li>
      </>
    )
  }

  return (
    <nav>
      <div>
        <img src={BannerPic()} alt='' className={styles.banner}/>
      </div>
      <ul className={styles.navbarLinks}>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
