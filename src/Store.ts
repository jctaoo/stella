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
  socialMedias: [
    {identifier: "1", iconName: "bilibili", title: "bilibili", link: "https://space.bilibili.com/155950817"},
    {identifier: "2", iconName: "github", title: "github", link: "https://github.com/jctaoo"},
    {identifier: "3", iconName: "mail", title: "mail", link: "mailto:jctaoo@outlook.com"},
    {identifier: "4", iconName: "twitter", title: "twitter", link: ""},
    {identifier: "5", iconName: "wechat", title: "wechat", link: ""},
  ],
};

const store = createStore(appReducer, composeWithDevTools(
  applyMiddleware(thunk)
));
export default store;
