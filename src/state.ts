import { createStore, applyMiddleware, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Reducer } from "redux";
import AppState from "./models/app-state";

// #==================== action ====================#

export const CHANGE_PATHNAME_ACTION_ID = Symbol("CHANGE_PATHNAME_ACTION_ID")

export class Actions {

  static createChangePathnameAction({destination}: {destination: string}): ChangePathnameAction {
    return {
      type: CHANGE_PATHNAME_ACTION_ID,
      destination,
    }
  }

}

export interface ChangePathnameAction extends Action<Symbol> {
  type: Symbol
  destination: string
}

// #==================== action ====================#


// #==================== reducer ====================#

const initialState: AppState = { currentPathname: "/" }
const appRducer: Reducer<AppState, Action<Symbol>> = (state = initialState, action): AppState => {
  if (action.type === CHANGE_PATHNAME_ACTION_ID) {
    const changePathnameAction = action as ChangePathnameAction;
    return {
      ...state,
      currentPathname: changePathnameAction.destination,
    };
  }
  return state;
}

// #==================== reducer ====================#


// #==================== store ====================#

const store = createStore(appRducer, composeWithDevTools(
  applyMiddleware(thunk)
));

// #==================== store ====================#


export default store;
