import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { selectFavotiteNannies } from "../../redux/favorite/selectors";
import {
  addToFavorite,
  deleteFromFavorite,
} from "../../redux/favorite/favoriteSlice";
import { selectCurrentUser } from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import sprite from "../../images/sprite.svg";
import styles from "./ButtonLike.module.css";

export const ButtonLike = ({ nannieName }) => {
  const dispatch = useDispatch();
  const favoriteNannies = useSelector(selectFavotiteNannies);
  const user = useSelector(selectCurrentUser);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLike(favoriteNannies.includes(nannieName));
    } else {
      setIsLike(false);
    }
  }, [favoriteNannies, nannieName, user]);

  const handleLike = () => {
    if (user) {
      if (isLike) {
        dispatch(deleteFromFavorite(nannieName));
      } else {
        dispatch(addToFavorite(nannieName));
      }
    } else {
      toast.error(
        "Only registered users can perform this action. Please register."
      );
    }
  };

  return (
    <button className={styles.buttonLikeWrapper} onClick={handleLike}>
      <svg
        className={`${styles.iconLike} ${isLike ? styles.liked : ""}`}
        width="26"
        height="26"
      >
        <use href={sprite + "#icon-like"} />
      </svg>
    </button>
  );
};

ButtonLike.propTypes = {
  nannieName: PropTypes.string.isRequired,
};
