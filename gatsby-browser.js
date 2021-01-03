import "./src/styles/constant.scss";
import "./src/styles/font.scss";
import "./src/styles/index.scss";
import "./src/styles/base.scss";
import "antd/dist/antd.css";
import "highlight.js/styles/atom-one-dark.css";
import store, { Actions } from "./src/state";
import { RouteUpdateArgs, RouteUpdateDelayedArgs } from "gatsby";

/**
 * @param {RouteUpdateArgs} args 
 */
export const onRouteUpdate = (args) => {
  if (store.getState().isLoading) {
    const disableLoadingAction = Actions.createChangeLoadingStateAction({ enable: false });
    store.dispatch(disableLoadingAction);
  }
  const action = Actions.createChangePathnameAction({ destination: args.location.pathname });
  store.dispatch(action);
}

/**
 * @param {RouteUpdateDelayedArgs} _args 
 */
export const onRouteUpdateDelayed = (_args) => {
  const enableLoadingAction = Actions.createChangeLoadingStateAction({ enable: true });
  store.dispatch(enableLoadingAction);
}

export { wrapRootElement } from "./src/gatsby-container";
