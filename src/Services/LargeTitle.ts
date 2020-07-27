import { createSelector } from "reselect";
import AppState from "../Models/AppState";

export const largeTitleSelector = createSelector<AppState, {}, string | undefined, string | undefined>(
  state => state.config.homeLargeTitle,
  current => current
);