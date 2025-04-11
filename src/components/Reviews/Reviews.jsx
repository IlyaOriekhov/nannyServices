// src/components/Reviews/Reviews.jsx
import PropTypes from "prop-types";
import sprite from "../../images/sprite.svg";
import styles from "./Reviews.module.css";

export const Reviews = ({ reviewsData }) => {
  return (
    <ul className={styles.list}>
      {reviewsData.map(({ comment, rating, reviewer }, index) => (
        <li key={index} className={styles.listItem}>
          <div className={styles.reviewerInfo}>
            <div className={styles.avatar}>{reviewer.charAt(0)}</div>
            <div>
              <p className={styles.reviewerInfoText}>{reviewer}</p>
              <p className={styles.reviewerInfoText}>
                <svg width={16} height={16}>
                  <use href={sprite + "#icon-star"} />
                </svg>
                {rating}
              </p>
            </div>
          </div>
          <p className={styles.comment}>{comment}</p>
        </li>
      ))}
    </ul>
  );
};

Reviews.propTypes = {
  reviewsData: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired,
      reviewer: PropTypes.string.isRequired,
    })
  ).isRequired,
};
