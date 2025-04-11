import { PuffLoader } from "react-spinners";
import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <PuffLoader
        color="#0957C3"
        cssOverride={{
          position: "absolute",
          top: "50%",
          right: "50%",
        }}
      />
    </div>
  );
};
