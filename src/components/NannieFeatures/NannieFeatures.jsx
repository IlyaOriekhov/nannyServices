import PropTypes from "prop-types";
import styles from "./NannieFeatures.module.css";

export const NannieFeatures = ({ title, text, age }) => {
  return (
    <li className={styles.wrapper}>
      <p className={styles.optionTitle}>
        {title} <span className={age ? styles.ageUnderline : ""}>{text}</span>
      </p>
    </li>
  );
};

NannieFeatures.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  age: PropTypes.bool,
};
