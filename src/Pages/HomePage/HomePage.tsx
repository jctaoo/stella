import React from "react";
import "./HomePage.scss"
import { BrowserRouter, Redirect, Route, Switch, useLocation } from "react-router-dom";
import NavigationBar from "../../Views/NavigationBar/NavigationBar";
import PassageListPage from "../PassageListPage/PassageListPage";
import PassagePage from "../PassagePage/PassagePage";
import { notFoundLink } from "../../Routes";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { AnimatePresence } from "framer-motion";
import MobileNavigationBar from "../../Views/MobileNavigationBar/MobileNavigationBar";

function HomePage() {
  // const location = useLocation()
  // TODO exit before enter
  // https://www.youtube.com/watch?v=qJt-FtzJ5fo
  return (
    <>
      <MobileNavigationBar/>
      <div id="home-page">
        <NavigationBar/>
        <AnimatePresence>
          <Switch>
            <Route path="/" exact component={() => <></>}/>
            <Route path="/passage" component={PassageListPage} exact />
            <Route path="/passage/:id" component={PassagePage} exact />
            <Route path={notFoundLink} component={NotFoundPage} exact />
            <Redirect from={"*"} to={notFoundLink} />
          </Switch>
        </AnimatePresence>
      </div>
    </>
  );
}

export default HomePage;