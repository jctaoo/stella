import { createSelector } from "reselect";
import AppState from "../Models/AppState";

export const categoriesSelector = createSelector<AppState, {}, string[], string[]>(
  state => {
    const result = state.passages.map(e => e.about.category).flat();
    return Array.from(new Set(result));
  },
  current => current
);