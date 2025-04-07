import React from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import css from "./FavouritePage.module.css";

const FavouritePage = () => {
  const favourites = useSelector((state) => state.favorites.favorites);

  return (
    <div className={css.favouritePageContainer}>
      <h2 className={css.favouritePageTitle}>My Favorite Nannies</h2>
      {favorites.length === 0 ? (
        <p className={css.favouritePageMessage}>
          You haven't added any favorites yet.
        </p>
      ) : (
        <div className={css.favouritePageCards}>
          {favourites.map((nanny) => (
            <Card key={nanny.id} nanny={nanny} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
