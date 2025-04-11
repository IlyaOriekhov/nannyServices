import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logOut } from "../../../redux/auth/operations";
import { selectCurrentUser } from "../../../redux/auth/selectors";
import sprite from "../../../images/sprite.svg";
import styles from "./AccountFeatures.module.css";

export const AccountFeatures = ({
  styleDirection,
  homePath,
  handleOpenLogInModal,
  handleOpenRegisterModal,
}) => {
  const dispatch = useDispatch();
  const name = useSelector(selectCurrentUser);
  const [authUser, setAuthUser] = useState(null);
  const [userName, setUserName] = useState(name);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setUserName(user?.displayName || "");
      } else {
        setAuthUser(null);
        setUserName("");
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <>
      {authUser || userName ? (
        <div className={styleDirection ? styles.wrapperColumn : styles.wrapper}>
          <div className={styles.userBox}>
            <div className={styles.userAvatarField}>
              <svg className={styles.avatar} height="16" width="16">
                <use href={sprite + "#icon-avatar"} />
              </svg>
            </div>
            <p className={styles.userName}>
              {authUser ? authUser.displayName : userName}
            </p>
          </div>

          <button
            className={styles.btnLogOut}
            onClick={() => dispatch(logOut())}
          >
            Log out
          </button>
        </div>
      ) : (
        <div className={styleDirection ? styles.btnBoxColumn : styles.btnBox}>
          <button
            className={`${styles.logInBtn} ${
              homePath ? styles.homePathBtn : ""
            }`}
            onClick={handleOpenLogInModal}
          >
            Log In
          </button>
          <button
            className={`${styles.registerBtn} ${
              homePath ? styles.homePathBtn : ""
            }`}
            onClick={handleOpenRegisterModal}
          >
            Registration
          </button>
        </div>
      )}
    </>
  );
};

AccountFeatures.propTypes = {
  styleDirection: PropTypes.string,
  homePath: PropTypes.bool,
  handleOpenLogInModal: PropTypes.func.isRequired,
  handleOpenRegisterModal: PropTypes.func.isRequired,
};
