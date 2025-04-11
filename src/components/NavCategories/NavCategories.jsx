import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { selectCurrentUser } from "../../redux/auth/selectors";
import styles from "./NavCategories.module.css";

export const NavCategories = ({ styleDirection }) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className={styleDirection ? styles.linkBoxColumn : styles.linkBox}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${styles.navigationLink} ${styles.active}`
            : styles.navigationLink
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/nannies"
        className={({ isActive }) =>
          isActive
            ? `${styles.navigationLink} ${styles.active}`
            : styles.navigationLink
        }
      >
        Nannies
      </NavLink>

      {currentUser && (
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? `${styles.navigationLink} ${styles.active}`
              : styles.navigationLink
          }
        >
          Favorites
        </NavLink>
      )}
    </div>
  );
};

NavCategories.propTypes = {
  styleDirection: PropTypes.string,
};
