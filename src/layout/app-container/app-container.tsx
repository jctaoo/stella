import React, { ReactElement } from "react";
import "./app-container.scss"
import { AnimatePresence } from "framer-motion";
import MobileNavigationBar from "../../components/mobile-navigation-bar/mobile-navigation-bar";
import NavigationBar from "../../components/navigation-bar/navigation-bar";
import { Provider } from "react-redux";
import store from "../../state";

function AppContainer({children}: {children: ReactElement}) {
  return (
    <div id="stella-container" style={{ display: "contents" }}>
      <Provider store={store}>
        <MobileNavigationBar />
        <div id="home-page">
          <NavigationBar />
          <AnimatePresence>
            { children }
          </AnimatePresence>
        </div>
      </Provider>
    </div>
  );
}

export default AppContainer;