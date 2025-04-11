import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filter/selectors";

export const selectNanniesData = (state) => state.nannies.nanniesData;

export const selectIsLoading = (state) => state.nannies.isLoading;

export const selectNanniesByFilter = createSelector(
  [selectNanniesData, selectFilter],
  (nannies, filterState) => {
    switch (filterState) {
      case "Show all":
        return nannies;
      case "Popular":
        return nannies.filter((nanny) => nanny.rating >= 4.7);
      case "Greater than 10$":
        return nannies.filter((nanny) => nanny.price_per_hour > 10);
      case "Less than 10$":
        return nannies.filter((nanny) => nanny.price_per_hour <= 10);
      case "Z to A":
        return nannies.slice().sort((a, b) => b.name.localeCompare(a.name));
      case "A to Z":
        return nannies.slice().sort((a, b) => a.name.localeCompare(b.name));
      default:
        return nannies;
    }
  }
);
