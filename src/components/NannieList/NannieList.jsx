import { useState } from "react";
import PropTypes from "prop-types";
import { NannieItem } from "../NannieItem/NannieItem";
import styles from "./NannieList.module.css";

export const NannieList = ({ data }) => {
  const [loadedCount, setLoadedCount] = useState(3);
  const perPage = 4;

  const currentData = data.slice(0, loadedCount);

  const loadMore = () => {
    setLoadedCount(loadedCount + perPage);
  };

  return (
    <>
      <ul className={styles.list}>
        {currentData.map((nannie, index) => (
          <NannieItem key={index} nannieData={nannie} />
        ))}
      </ul>
      {loadedCount < data.length && (
        <button className={styles.button} onClick={loadMore}>
          Load more
        </button>
      )}
    </>
  );
};

NannieList.propTypes = {
  data: PropTypes.array.isRequired,
};
