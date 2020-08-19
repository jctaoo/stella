import { createSelector } from "reselect";
import AppState from "../Models/AppState";
import { Tag } from "../Models/BaseContent";

export const tagsSelector = createSelector<AppState, {}, Tag[], Tag[]>(
  state => {
    const result: Tag[] = [];
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