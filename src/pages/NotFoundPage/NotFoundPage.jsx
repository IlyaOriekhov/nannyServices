import React from "react";
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.notFoundContainer}>
      <h1 className={css.notFoundTitle}>404</h1>
      <p className={css.notFoundMessage}>
        Oops! The page you're looking for cannot be found.
      </p>
      <Link to="/" className={css.notFoundLink}>
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
