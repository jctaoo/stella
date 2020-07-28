import { createSelector } from "reselect";
import AppState from "../Models/AppState";
import { PassageTag } from "../Models/PassageTag";

export const tagsSelector = createSelector<AppState, {}, PassageTag[], PassageTag[]>(
  state => {
    const result: PassageTag[] = [];
    state.passages.forEach(e => {
      e.about.tags.forEach(t => {
        if (!result.map(i => i.id).includes(t.id)) {
          result.push(t);
        }
      })
    })
    return result;
  },
  current => current
);