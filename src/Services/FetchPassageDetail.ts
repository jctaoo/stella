import { Action, Dispatch } from "redux";
import fetchPassageDetail from "../Apis/FetchPassageDetail";
import PassageDetailState from "../Models/PassageDetailState";
import PassageDetail from "../Models/PassageDetail";
import { UPDATE_PASSAGE_DETAIL_STATE } from "./ActionTypes";
import { createSelector } from "reselect";
import AppState from "../Models/AppState";

export interface UpdateCurrentPassageDetailAction extends Action<symbol> {
  type: symbol
  state: PassageDetail | PassageDetailState
}

export function createUpdateCurrentPassageDetailStateAction(
  state: PassageDetail | PassageDetailState
): UpdateCurrentPassageDetailAction {
  return {
    type: UPDATE_PASSAGE_DETAIL_STATE,
    state: state
  };
}

export function createFetchPassageDetailAction(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(createUpdateCurrentPassageDetailStateAction(PassageDetailState.loading));
    try {
      const result = await fetchPassageDetail(id);
      if (result) {
        dispatch(createUpdateCurrentPassageDetailStateAction(result));
      } else {
        dispatch(createUpdateCurrentPassageDetailStateAction(PassageDetailState.notfound));
      }
    } catch (e) {
      dispatch(createUpdateCurrentPassageDetailStateAction(PassageDetailState.fail));
    }
  }
}

type CurrentPassage = PassageDetail | PassageDetailState | undefined;
export const currentPassageSelector = createSelector<AppState, {}, CurrentPassage, CurrentPassage>(
  state => state.currentPassage,
  current => current
)