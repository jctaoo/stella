import { createStore, Action, applyMiddleware } from "redux";
import AppState from "./Models/AppState";
import thunk from "redux-thunk";
import { UPDATE_PASSAGE_DETAIL_STATE } from "./Services/ActionTypes";
import { UpdateCurrentPassageDetailAction } from "./Services/FetchPassageDetail";
import { composeWithDevTools } from 'redux-devtools-extension';
import { demoPassageAbbrs } from "./Models/Passage";
import { demoSnippetsAbbrs } from "./Models/Snippet";

function appReducer(state: AppState | undefined = initialState, action: Action<symbol>): AppState {
  if (action.type === UPDATE_PASSAGE_DETAIL_STATE) {
    const updateAction = action as UpdateCurrentPassageDetailAction;
    return {
      ...state,
      currentPassage: updateAction.state,
    };
  }
  return state;
}

const initialState: AppState = {
  config: {
    siteName: "jctaoo",
    rootUrl: "/",
    homeLargeTitle: "Jctaoo.",
    discus: {
      shortName: "jctaoo",
    },
    code: {
      highlightThemeName: "atom-one-dark"
    },
  },
  passages: demoPassageAbbrs,
  snippets: demoSnippetsAbbrs,
};

const store = createStore(appReducer, composeWithDevTools(
  applyMiddleware(thunk)
));
export default store;
