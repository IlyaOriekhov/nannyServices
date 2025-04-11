import styles from "./HomeStatistics.module.css";
import sprite from "../../images/sprite.svg";

export const HomeStatistics = () => {
  return (
    <div className={styles.addInfoWrapper}>
      <div className={styles.svgBox}>
        <svg height="30" width="30">
          <use href={sprite + "#icon-check-arrow"} />
        </svg>
      </div>
      <div>
        <p className={styles.addInfoTitle}>Experienced nannies</p>
        <p className={styles.addInfoNumber}>15,000</p>
      </div>
    </div>
  );
};
