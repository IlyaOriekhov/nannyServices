import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className={styles.logoContainer}>
      <h2 className={styles.serviceName}>Nanny.Services</h2>
    </Link>
  );
};
