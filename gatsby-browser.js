import "./src/styles/constant.scss";
import "./src/styles/font.scss";
import "./src/styles/index.scss";
import "./src/styles/base.scss";
import "antd/dist/antd.css";
import "highlight.js/styles/atom-one-dark.css";
import configMarked from "./src/marked-configuration";
import store, { Actions } from "./src/state";
import { RouteUpdateArgs } from "gatsby";

export const onClientEntry = () => {
  configMarked();
};

export const onPreRouteUpdate = ({ location, prevLocation }) => {
  // console.log("Gatsby started to change location to", location.pathname)
  // console.log("Gatsby started to change location from", prevLocation ? prevLocation.pathname : null)
}

/**
 * @param {RouteUpdateArgs} args 
 */
export const onRouteUpdate = (args) => {
  const action = Actions.createChangePathnameAction({ destination: args.location.pathname });
  store.dispatch(action);
}

export const onRouteUpdateDelayed = () => {
  // console.log("We can show loading indicator now")
}

export { wrapRootElement } from "./src/gatsby-container";
