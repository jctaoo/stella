import React, { ReactElement } from "react";
import "./app-container.scss"
import { AnimatePresence } from "framer-motion";
import MobileNavigationBar from "../../components/mobile-navigation-bar/mobile-navigation-bar";
import NavigationBar from "../../components/navigation-bar/navigation-bar";
import TopProgressBar from "../../components/top-progress-bar/top-progress-bar";

function AppContainer({children}: {children: ReactElement}) {
  return (
    <>
      <TopProgressBar show={false}/>
      <MobileNavigationBar />
      <div id="home-page">
        <NavigationBar />
        <AnimatePresence>
          { children }
        </AnimatePresence>
      </div>
    </>
  );
}

export default AppContainer;