import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NannieFeatures } from "../NannieFeatures/NannieFeatures";
import { Reviews } from "../Reviews/Reviews";
import { ButtonLike } from "../ButtonLike/ButtonLike";
import ModalWindow from "../ModalWindow/ModalWindow";
import { Application } from "../Application/Application";
import sprite from "../../images/sprite.svg";
import styles from "./NannieItem.module.css";

export const NannieItem = ({ nannieData }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heightModalParameter, setHeightModalParameter] = useState("");
  const [scrollModalParameter, setScrollModalParameter] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseLogInModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "visible";
  };

  const getAge = (birthdayDate) => {
    const birthday = new Date(birthdayDate);
    const ageInMillis = Date.now() - birthday.getTime();
    const age = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25));
    return age;
  };

  const characters = nannieData.characters
    .map((item) => item.charAt(0).toUpperCase() + item.substring(1))
    .join(", ");

  useEffect(() => {
    const handleResize = () => {
      const newHeightParameter = window.innerWidth >= 1630 ? "900px" : "86vh";
      setHeightModalParameter(newHeightParameter);

      const newScrollParameter = window.innerWidth >= 1830 ? "hidden" : "auto";
      setScrollModalParameter(newScrollParameter);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <li className={styles.listItem}>
      <div className={styles.imageWrapper}>
        <img src={nannieData.avatar_url} width={96} alt={nannieData.name} />
        <svg width={14} height={14}>
          <use href={sprite + "#icon-status-online"} />
        </svg>
      </div>
      <div className={styles.buttonLikeStyled}>
        <ButtonLike nannieName={nannieData.name} />
      </div>
      <div>
        <div className={styles.nanieContacts}>
          <div>
            <p className={styles.position}>Nanny</p>
            <h3 className={styles.name}>{nannieData.name}</h3>
          </div>
          <div className={styles.locationRatingPriceBox}>
            <p className={styles.locationRatingPriceContent}>
              <svg width={16} height={16}>
                <use
                  href={sprite + "#icon-location"}
                  style={{ fill: "transparent", stroke: "#11101c" }}
                />
              </svg>
              {nannieData.location}
            </p>
            <p className={styles.locationRatingPriceContent}>
              <svg width={16} height={16}>
                <use href={sprite + "#icon-star"} />
              </svg>
              Rating: {nannieData.rating.toFixed(1)}
            </p>
            <p className={styles.locationRatingPriceContent}>
              Price / 1 hour:
              <span className={styles.priceSpan}>
                {" "}
                {nannieData.price_per_hour}$
              </span>
            </p>
          </div>
        </div>
        <ul className={styles.featuresList}>
          <NannieFeatures
            age={true}
            title="Age:"
            text={getAge(nannieData.birthday)}
          />
          <NannieFeatures title="Experience:" text={nannieData.experience} />
          <NannieFeatures title="Kids Age:" text={nannieData.kids_age} />
          <NannieFeatures title="Characters:" text={characters} />
          <NannieFeatures title="Education:" text={nannieData.education} />
        </ul>

        <p className={styles.textAbout}>{nannieData.about}</p>

        {!showReviews ? (
          <button className={styles.buttonReadMore} onClick={toggleReviews}>
            Read more
          </button>
        ) : (
          <>
            <Reviews reviewsData={nannieData.reviews} />
            <div className={styles.buttonContainer}>
              <button
                className={styles.buttonOpenModal}
                onClick={handleOpenModal}
              >
                Make an appointment
              </button>
              <button className={styles.buttonCollapse} onClick={toggleReviews}>
                Collapse
              </button>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <ModalWindow
          isOpen={isModalOpen}
          onRequestClose={handleCloseLogInModal}
          heightParameter={heightModalParameter}
          width="599px"
          scroll={scrollModalParameter}
        >
          <Application
            onRequestClose={handleCloseLogInModal}
            nannieImg={nannieData.avatar_url}
            nannieName={nannieData.name}
          />
        </ModalWindow>
      )}
    </li>
  );
};

NannieItem.propTypes = {
  nannieData: PropTypes.shape({
    about: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    characters: PropTypes.arrayOf(PropTypes.string).isRequired,
    education: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    kids_age: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price_per_hour: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        comment: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        reviewer: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
