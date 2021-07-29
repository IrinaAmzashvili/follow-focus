import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styles from './ProfileButton.module.css';


const ProfileButton = ({ sessionUser }) => {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  return (
    <button className={`${styles.profileButton} link-button`} activeClassName='activeNavLink' onClick={openMenu}>
      <i className={`${styles.profileIcon} fas fa-user-circle`}></i>
      {sessionUser.username}
      {showMenu && (
        <ul className={styles.profileDropdown}>
          <li>
            <NavLink exact to={`/users/${sessionUser.id}`}>Profile</NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      )}
    </button>
  )
}

export default ProfileButton;