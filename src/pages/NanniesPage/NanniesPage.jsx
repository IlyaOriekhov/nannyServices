import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NannieList } from "../../components/NannieList/NannieList";
import { Loader } from "../../components/Loader/Loader";
import { Filters } from "../../components/Filters/Filters";
import { getNanniesData } from "../../redux/nannies/operations";
import {
  selectIsLoading,
  selectNanniesByFilter,
} from "../../redux/nannies/selectors";
import styles from "./NanniesPage.module.css";

const NanniesPage = () => {
  const dispatch = useDispatch();
  const nanniesData = useSelector(selectNanniesByFilter);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getNanniesData());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {nanniesData && (
        <>
          <Filters />
          <NannieList data={nanniesData} />
        </>
      )}
      {!nanniesData && !isLoading && (
        <h3 className={styles.errorMessage}>
          Something went wrong, try to reload the page..
        </h3>
      )}
    </div>
  );
};

export default NanniesPage;
