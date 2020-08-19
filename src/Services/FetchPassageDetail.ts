import { Action, Dispatch } from "redux";
import fetchPassageDetail from "../Apis/FetchPassageDetail";
import { UPDATE_PASSAGE_DETAIL_STATE } from "./ActionTypes";
import { createSelector } from "reselect";
import AppState from "../Models/AppState";
import { PassageDetail } from "../Models/Passage";
import { ContentDetailState } from "../Models/BaseContent";

export interface UpdateCurrentPassageDetailAction extends Action<symbol> {
  type: symbol
  state: PassageDetail | ContentDetailState
}

export function createUpdateCurrentPassageDetailStateAction(
  state: PassageDetail | ContentDetailState
): UpdateCurrentPassageDetailAction {
  return {
    type: UPDATE_PASSAGE_DETAIL_STATE,
    state: state
  };
}

export function createFetchPassageDetailAction(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(createUpdateCurrentPassageDetailStateAction(ContentDetailState.loading));
    try {
      const result = await fetchPassageDetail(id);
      if (result) {
        dispatch(createUpdateCurrentPassageDetailStateAction(result));
      } else {
        dispatch(createUpdateCurrentPassageDetailStateAction(ContentDetailState.notfound));
      }
    } catch (e) {
      dispatch(createUpdateCurrentPassageDetailStateAction(ContentDetailState.fail));
    }
  }
}

type CurrentPassage = PassageDetail | ContentDetailState | undefined;
export const currentPassageSelector = createSelector<AppState, {}, CurrentPassage, CurrentPassage>(
  state => state.currentPassage,
  current => current
)