import "./src/styles/constant.scss";
import "./src/styles/font.scss";
import "./src/styles/index.scss";
import "./src/styles/base.scss";
import store, { Actions } from "./src/state";

import "katex/dist/katex.min.css";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

/**
 * @param {RouteUpdateArgs} args
 */
export const onRouteUpdate = (args) => {
  if (store.getState().isLoading) {
    const disableLoadingAction = Actions.createChangeLoadingStateAction({
      enable: false,
    });
    store.dispatch(disableLoadingAction);
  }
  const action = Actions.createChangePathnameAction({
    destination: args.location.pathname,
  });
  store.dispatch(action);
};

/**
 * @param {RouteUpdateDelayedArgs} _args
 */
export const onRouteUpdateDelayed = (/*_args*/) => {
  const enableLoadingAction = Actions.createChangeLoadingStateAction({
    enable: true,
  });
  store.dispatch(enableLoadingAction);
};

export { wrapRootElement } from "./src/gatsby-container";
