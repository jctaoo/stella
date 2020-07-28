import PassageDetailState from "../Models/PassageDetailState";
import { createUpdateCurrentPassageDetailStateAction } from "./FetchPassageDetail";
import { Dispatch } from "redux";
import fetchAbout from "../Apis/FetchAbout";

export function createFetchAboutAction() {
  return async (dispatch: Dispatch) => {
    dispatch(createUpdateCurrentPassageDetailStateAction(PassageDetailState.loading));
    try {
      const result = await fetchAbout();
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