import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BannerPic } from "../../image/image";
import ProfileButton from "./ProfileButton";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav>
      <div>
        <img src={BannerPic()} alt="" className={styles.banner} />
      </div>
      <ul className={styles.navbarLinks}>
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
          <ProfileButton sessionUser={sessionUser} />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
