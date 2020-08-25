import "./src/styles/constant.scss";
import "./src/styles/font.scss";
import "./src/styles/index.scss";
import "./src/styles/base.scss";
import "antd/dist/antd.css";
import "highlight.js/styles/atom-one-dark.css";
import configMarked from "./src/marked-configuration";

export const onClientEntry = () => {
  configMarked();
};

export const onPreRouteUpdate = ({ location, prevLocation }) => {
  console.log("Gatsby started to change location to", location.pathname)
  console.log("Gatsby started to change location from", prevLocation ? prevLocation.pathname : null)
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log('new pathname', location.pathname)
  console.log('old pathname', prevLocation ? prevLocation.pathname : null)
}

export const onRouteUpdateDelayed = () => {
  console.log("We can show loading indicator now")
}

export { wrapRootElement } from "./src/gatsby-container";
