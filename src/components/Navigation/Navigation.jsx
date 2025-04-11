import { useState } from "react";
import { useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu/MobileMenu";
import ModalWindow from "../ModalWindow/ModalWindow";
import { SignUp } from "../Auth/SignUp/SignUp";
import { SignIn } from "../Auth/SignIn/SignIn";
import { AccountFeatures } from "../Auth/AccountFeatures/AccountFeatures";
import { NavCategories } from "../NavCategories/NavCategories";
import { Logo } from "../Logo/Logo";
import { ChangeColor } from "../ChangeColor/ChangeColor";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isModalLogInOpen, setIsModalLogInOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
    document.body.style.overflow = "visible";
  };

  const handleOpenLogInModal = () => {
    setIsModalLogInOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseLogInModal = () => {
    setIsModalLogInOpen(false);
    document.body.style.overflow = "visible";
  };

  return (
    <>
      <div
        className={`${styles.navWrapper} ${
          isHome ? styles.homeNav : styles.solidNav
        }`}
      >
        <div className={styles.box}>
          <div className={styles.leftGroup}>
            <Logo />
            <div className={styles.colorPickerContainer}>
              <ChangeColor />
            </div>
          </div>

          <div className={styles.centerGroup}>
            <NavCategories />
          </div>

          <div className={styles.rightGroup}>
            <AccountFeatures
              handleOpenLogInModal={handleOpenLogInModal}
              handleOpenRegisterModal={handleOpenRegisterModal}
              homePath={isHome}
            />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <MobileMenu
          onClick={toggleMenu}
          openRegister={handleOpenRegisterModal}
          openLogIn={handleOpenLogInModal}
        />
      )}

      {isRegisterModalOpen && (
        <ModalWindow
          isOpen={isRegisterModalOpen}
          onRequestClose={handleCloseRegisterModal}
          heightParameter="579px"
        >
          <SignUp onRequestClose={handleCloseRegisterModal} />
        </ModalWindow>
      )}

      {isModalLogInOpen && (
        <ModalWindow
          isOpen={isModalLogInOpen}
          onRequestClose={handleCloseLogInModal}
          heightParameter="489px"
        >
          <SignIn onRequestClose={handleCloseLogInModal} />
        </ModalWindow>
      )}
    </>
  );
};
