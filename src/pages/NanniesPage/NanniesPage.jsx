import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../firebase";
import css from "./NanniesPage.module.css";

const NanniesPage = () => {
  const { id } = useParams();
  const [nanny, setNanny] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNanny = async () => {
      try {
        const snapshot = await get(ref(db, `nannies/${id}`));
        if (snapshot.exists()) {
          setNanny(snapshot.val());
        } else {
          setNanny(null);
        }
      } catch (error) {
        console.error("Error fetching nanny data:", error);
      }
      setLoading(false);
    };

    fetchNanny();
  }, [id]);

  if (loading) {
    return (
      <div className={css.nanniesPageContainer}>
        <p className={css.nanniesPageLoading}>Loading...</p>
      </div>
    );
  }

  if (!nanny) {
    return (
      <div className={css.nanniesPageContainer}>
        <p className={css.nanniesPageError}>Nanny not found.</p>
      </div>
    );
  }

  return (
    <div className={css.nanniesPageContainer}>
      <h2 className={css.nanniesPageTitle}>{nanny.name}</h2>
      <img
        src={nanny.avatar_url}
        alt={nanny.name}
        className={css.nanniesPageAvatar}
      />
      <div className={css.nanniesPageDetails}>
        <p>
          <strong>Birthday:</strong> {nanny.birthday}
        </p>
        <p>
          <strong>Experience:</strong> {nanny.experience}
        </p>
        <p>
          <strong>Education:</strong> {nanny.education}
        </p>
        <p>
          <strong>About:</strong> {nanny.about}
        </p>
        <p>
          <strong>Kids Age:</strong> {nanny.kids_age}
        </p>
        <p>
          <strong>Location:</strong> {nanny.location}
        </p>
        <p>
          <strong>Characters:</strong> {nanny.characters}
        </p>
        <p>
          <strong>Reviews:</strong> {nanny.reviews}
        </p>
        <p>
          <strong>Price per hour:</strong> ${nanny.price_per_hour}
        </p>
        <p>
          <strong>Rating:</strong> {nanny.rating}
        </p>
      </div>
    </div>
  );
};

export default NanniePage;
