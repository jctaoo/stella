import { createUpdateCurrentPassageDetailStateAction } from "./FetchPassageDetail";
import { Dispatch } from "redux";
import fetchAbout from "../Apis/FetchAbout";
import { ContentDetailState } from "../Models/BaseContent";

export function createFetchAboutAction() {
  return async (dispatch: Dispatch) => {
    dispatch(createUpdateCurrentPassageDetailStateAction(ContentDetailState.loading));
    try {
      const result = await fetchAbout();
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