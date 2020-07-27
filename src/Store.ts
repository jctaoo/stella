import { createStore, Action, applyMiddleware } from "redux";
import AppState from "./Models/AppState";
import thunk from "redux-thunk";
import {
  demoPassage1,
  demoPassage2,
  demoPassage3,
  demoPassage4,
  demoPassage5,
  demoPassage6
} from "./Models/PassageAbbr";
import { UPDATE_PASSAGE_DETAIL_STATE } from "./Services/Constant";
import { UpdateCurrentPassageDetailAction } from "./Services/FetchPassageDetail";
import { composeWithDevTools } from 'redux-devtools-extension';

function appReducer(state: AppState | undefined = initialState, action: Action<symbol>): AppState {
  if (action.type === UPDATE_PASSAGE_DETAIL_STATE) {
    const updateAction = action as UpdateCurrentPassageDetailAction;
    return {
      ...state,
      currentPassage: updateAction.state
    };
  }
  return state;
}

const initialState: AppState = {
  config: {
    siteName: "jctaoo",
    rootUrl: "/",
    homeLargeTitle: "Jctaoo."
  },
  passages: [
    demoPassage1,
    demoPassage2,
    demoPassage3,
    demoPassage4,
    demoPassage5,
    demoPassage6,
  ],
};

const store = createStore(appReducer, composeWithDevTools(
  applyMiddleware(thunk)
));
export default store;
