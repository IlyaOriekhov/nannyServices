// В файлі FavoritesPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavotiteNannies } from "../../redux/favorite/selectors";
import {
  selectNanniesData,
  selectIsLoading,
} from "../../redux/nannies/selectors";
import { getNanniesData } from "../../redux/nannies/operations";
import { NannieList } from "../../components/NannieList/NannieList";
import { Loader } from "../../components/Loader/Loader";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteNanniesName = useSelector(selectFavotiteNannies);
  const allNannies = useSelector(selectNanniesData);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    // Завантажуємо дані нянь, якщо їх немає
    if (allNannies.length === 0) {
      dispatch(getNanniesData());
    }
  }, [dispatch, allNannies.length]);

  const favorites = allNannies.filter((item) =>
    favoriteNanniesName.includes(item.name)
  );

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : favorites.length > 0 ? (
        <NannieList data={favorites} />
      ) : (
        <p className={styles.emptyMessage}>Your favorite list is empty.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
