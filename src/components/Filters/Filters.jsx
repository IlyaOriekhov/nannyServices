import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../redux/filter/selectors";
import { changeFilter } from "../../redux/filter/filterSlice";
import sprite from "../../images/sprite.svg";
import styles from "./Filters.module.css";

export const Filters = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [showOptions, setShowOptions] = useState(false);

  const filtersRef = useRef(null);

  const handleChange = (value) => {
    dispatch(changeFilter(value));
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.optionsContainer} ref={filtersRef}>
      <p className={styles.title}>Filters</p>
      <div
        className={styles.selector}
        onClick={() => setShowOptions(!showOptions)}
      >
        <p>{filter}</p>
        <svg height="20" width="20">
          <use href={sprite + "#icon-chevron-down"} fill="white" />
        </svg>
      </div>

      {showOptions && (
        <div className={styles.optionsList}>
          <div
            className={`${styles.option} ${
              filter === "A to Z" ? styles.selected : ""
            }`}
            onClick={() => handleChange("A to Z")}
          >
            A to Z
          </div>
          <div
            className={`${styles.option} ${
              filter === "Z to A" ? styles.selected : ""
            }`}
            onClick={() => handleChange("Z to A")}
          >
            Z to A
          </div>
          <div
            className={`${styles.option} ${
              filter === "Less than 10$" ? styles.selected : ""
            }`}
            onClick={() => handleChange("Less than 10$")}
          >
            Less than 10$
          </div>
          <div
            className={`${styles.option} ${
              filter === "Greater than 10$" ? styles.selected : ""
            }`}
            onClick={() => handleChange("Greater than 10$")}
          >
            Greater than 10$
          </div>
          <div
            className={`${styles.option} ${
              filter === "Not Popular" ? styles.selected : ""
            }`}
            onClick={() => handleChange("Not Popular")}
          >
            Not Popular
          </div>
          <div
            className={`${styles.option} ${
              filter === "Popular" ? styles.selected : ""
            }`}
            onClick={() => handleChange("Popular")}
          >
            Popular
          </div>
          <div
            className={`${styles.option} ${
              filter === "Show all" ? styles.selected : ""
            }`}
            onClick={() => handleChange("Show all")}
          >
            Show all
          </div>
        </div>
      )}
    </div>
  );
};
