import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HomeStatistics } from "../../components/HomeStatistics/HomeStatistics";
import { Logo } from "../../components/Logo/Logo";
import { ChangeColor } from "../../components/ChangeColor/ChangeColor";
import { NavCategories } from "../../components/NavCategories/NavCategories";
import { AccountFeatures } from "../../components/Auth/AccountFeatures/AccountFeatures";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { SignUp } from "../../components/Auth/SignUp/SignUp";
import { SignIn } from "../../components/Auth/SignIn/SignIn";
import sprite from "../../images/sprite.svg";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isModalLogInOpen, setIsModalLogInOpen] = useState(false);

  const getStarted = () => {
    navigate("/nannies");
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
    <div className={styles.container}>
      <div className={styles.pageWrapper}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Logo />
            <div className={styles.colorPickerContainer}>
              <ChangeColor />
            </div>
          </div>
          <div className={styles.headerRight}>
            <NavCategories />
            <AccountFeatures
              handleOpenLogInModal={handleOpenLogInModal}
              handleOpenRegisterModal={handleOpenRegisterModal}
              homePath={true}
            />
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.leftSide}>
            <div className={styles.textContent}>
              <h1 className={styles.title}>Make Life Easier for the Family:</h1>
              <p className={styles.text}>
                Find Babysitters Online for All Occasions
              </p>
            </div>

            <button className={styles.linkBtn} onClick={getStarted}>
              <span>Get started</span>
              <svg height="17" width="15">
                <use href={sprite + "#icon-arrow"} />
              </svg>
            </button>
          </div>

          <div className={styles.rightSide}></div>
          <HomeStatistics />
        </div>

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
      </div>
    </div>
  );
};

export default HomePage;
