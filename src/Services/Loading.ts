import { createSelector } from "reselect";
import AppState from "../Models/AppState";
import PassageDetailState from "../Models/PassageDetailState";

export const isLoadingSelector = createSelector<AppState, {}, boolean, boolean>(
  state => state.currentPassage === PassageDetailState.loading,
  current => current
);