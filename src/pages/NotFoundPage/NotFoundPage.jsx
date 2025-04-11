import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.notFoundContainer}>
      <Header />

      <div className={css.contentContainer}>
        <h1 className={css.errorCode}>404</h1>
        <h2 className={css.errorTitle}>Page Not Found</h2>
        <p className={css.errorMessage}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className={css.actionButtons}>
          <Link to="/" className={css.homeButton}>
            Go to Home
          </Link>
          <Link to="/nannies" className={css.nanniesButton}>
            Browse Nannies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
