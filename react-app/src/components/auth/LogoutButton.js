import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import styles from '../NavBar/ProfileButton.module.css';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} className={`${styles.logoutButton} link-button`}>Logout</button>;
};

export default LogoutButton;
