import { createStore, applyMiddleware, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Reducer } from "redux";
import AppState from "./models/app-state";

// #==================== action ====================#

export const CHANGE_PATHNAME_ACTION_ID = Symbol("CHANGE_PATHNAME_ACTION_ID")
export const CHANGE_LOADING_STATE_ID = Symbol("CHANGE_LOADING_STATE_ID")

export class Actions {

  static createChangePathnameAction({ destination }: { destination: string }): ChangePathnameAction {
    return {
      type: CHANGE_PATHNAME_ACTION_ID,
      destination,
    }
  }

  static createChangeLoadingStateAction({ enable }: { enable: boolean }): ChangeLoadingStateAction {
    return {
      type: CHANGE_LOADING_STATE_ID,
      enable: enable
    }
  }

}

export interface ChangePathnameAction extends Action<Symbol> {
  type: Symbol
  destination: string
}

export interface ChangeLoadingStateAction extends Action<Symbol> {
  type: Symbol
  enable: boolean
}

// #==================== action ====================#


// #==================== reducer ====================#

const initialState: AppState = { 
  currentPathname: "/", 
  isLoading: false 
};

const appRducer: Reducer<AppState, Action<Symbol>> = (state = initialState, action): AppState => {
  if (action.type === CHANGE_PATHNAME_ACTION_ID) {
    const changePathnameAction = action as ChangePathnameAction;
    return {
      ...state,
      currentPathname: changePathnameAction.destination,
    };
  } else if (action.type === CHANGE_LOADING_STATE_ID) {
    const changeLoadingStateAction = action as ChangeLoadingStateAction;
    return {
      ...state,
      isLoading: changeLoadingStateAction.enable,
    }
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
