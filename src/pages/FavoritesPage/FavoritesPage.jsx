import { useSelector } from "react-redux";
import { selectFavotiteNannies } from "../../redux/favorite/selectors";
import { selectNanniesData } from "../../redux/nannies/selectors";
import { NannieList } from "../../components/NannieList/NannieList";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const favoriteNanniesName = useSelector(selectFavotiteNannies);
  const allNannies = useSelector(selectNanniesData);

  const favorites = allNannies.filter((item) =>
    favoriteNanniesName.includes(item.name)
  );

  return (
    <div className={styles.container}>
      {favorites.length > 0 ? (
        <NannieList data={favorites} />
      ) : (
        <p className={styles.emptyMessage}>Your favorite list is empty.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
