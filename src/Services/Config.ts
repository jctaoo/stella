import { createSelector } from "reselect";
import AppState from "../Models/AppState";
import Config, { DiscusConfig } from "../Models/Config";

export const configSelector = createSelector<AppState, {}, Config, Config>(
  state => state.config,
  current => current
)
