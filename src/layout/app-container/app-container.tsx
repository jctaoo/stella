import React, { ReactElement } from "react";
import "./app-container.scss"
import { AnimatePresence } from "framer-motion";
import MobileNavigationBar from "../../components/mobile-navigation-bar/mobile-navigation-bar";
import NavigationBar from "../../components/navigation-bar/navigation-bar";

function AppContainer({children}: {children: ReactElement}) {
  return (
    <div id="stella-container" style={{ display: "contents" }}>
      <MobileNavigationBar />
      <div id="home-page">
        <NavigationBar />
        <AnimatePresence>
          { children }
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AppContainer;