import React from "react";
import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.homeContainer}>
      <h1>Nanny Services</h1>
      <p>Your trusted partner for finding the perfect nanny.</p>
      <Link className={css.getStartedButton} to="/nannies">
        Get Started
      </Link>
    </div>
  );
};

export default Home;
