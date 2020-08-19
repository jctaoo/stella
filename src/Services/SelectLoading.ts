import { createSelector } from "reselect";
import AppState from "../Models/AppState";
import { ContentDetailState } from "../Models/BaseContent";

export const isLoadingSelector = createSelector<AppState, {}, boolean, boolean>(
  state => state.currentPassage === ContentDetailState.loading,
  current => current
);