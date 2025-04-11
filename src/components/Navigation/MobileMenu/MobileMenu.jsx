import { useEffect } from "react";
import PropTypes from "prop-types";
import { NavCategories } from "../../NavCategories/NavCategories";
import { AccountFeatures } from "../../Auth/AccountFeatures/AccountFeatures";
import sprite from "../../../images/sprite.svg";
import styles from "./MobileMenu.module.css";

const MobileMenu = ({ onClick, openRegister, openLogIn }) => {
  const handleCloseClick = () => {
    onClick();
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClick]);

  const handleLogInClick = () => {
    openLogIn();
    handleCloseClick();
  };

  const handleRegisterClick = () => {
    openRegister();
    handleCloseClick();
  };

  return (
    <div className={styles.backdropMenu} onClick={handleBackdropClick}>
      <div className={styles.menuContainer}>
        <div className={styles.closeBtn} onClick={handleCloseClick}>
          <svg className={styles.iconClose}>
            <use href={`${sprite}#icon-x`} />
          </svg>
        </div>
        <div className={styles.navContainer}>
          <NavCategories styleDirection="column" />

          <AccountFeatures
            styleDirection="column"
            handleOpenLogInModal={handleLogInClick}
            handleOpenRegisterModal={handleRegisterClick}
          />
        </div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  openRegister: PropTypes.func.isRequired,
  openLogIn: PropTypes.func.isRequired,
};

export default MobileMenu;
