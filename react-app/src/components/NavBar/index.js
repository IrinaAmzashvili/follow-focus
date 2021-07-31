
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginForm';
import SignUpFormModal from '../auth/SignUpForm';


const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/tutorials' exact={true} activeClassName='active'>
            Tutorials
          </NavLink>
        </li>
        <li>
          {/* <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink> */}
          <LoginFormModal linkText={'Log In'}/>
        </li>
        <li>
          {/* <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink> */}
          <SignUpFormModal linkText={'Sign Up'} />
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
