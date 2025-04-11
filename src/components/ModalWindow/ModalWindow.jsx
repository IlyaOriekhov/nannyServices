import { useEffect } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import sprite from "../../images/sprite.svg";
import styles from "./ModalWindow.module.css";

const ModalWindow = ({
  isOpen,
  onRequestClose,
  heightParameter,
  children,
  width,
  scroll,
}) => {
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onRequestClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onRequestClose]);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(11, 11, 11, 0.6)",
      zIndex: "1001",
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#FBFBFB",
      borderRadius: "30px",
      padding: "0",
      minWidth: "300px",
      maxWidth: width || "565px",
      height: heightParameter,
      overflowY: "hidden",
      border: "none",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <svg
        className={styles.closeModalBtn}
        onClick={onRequestClose}
        width="26"
        height="26"
      >
        <use href={`${sprite}#icon-x`}></use>
      </svg>
      <div
        className={styles.contentWrapper}
        style={{ overflow: scroll || "hidden", height: heightParameter }}
      >
        {children}
      </div>
    </Modal>
  );
};

ModalWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  heightParameter: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  scroll: PropTypes.string,
};

export default ModalWindow;
