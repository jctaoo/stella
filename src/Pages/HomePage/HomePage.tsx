import React from "react";
import "./HomePage.scss"
import { Redirect, Route, Switch } from "react-router-dom";
import NavigationBar from "../../Views/NavigationBar/NavigationBar";
import PassageListPage from "../PassageListPage/PassageListPage";
import PassagePage from "../PassagePage/PassagePage";
import { aboutLink, codeSnippetLink, notFoundLink, passageLink, rootLink } from "../../Routes";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { AnimatePresence } from "framer-motion";
import MobileNavigationBar from "../../Views/MobileNavigationBar/MobileNavigationBar";
import { useSelector } from "react-redux";
import { largeTitleSelector } from "../../Services/SelectLargeTitle";
import { isLoadingSelector } from "../../Services/SelectLoading";
import TopProgressBar from "../../Views/TopProgressBar/TopProgressBar";
import AboutPage from "../AboutPage/AboutPage";
import SnippetPage from "../SnippetPage/SnippetPage";

function HomePage() {
  // @ts-ignore
  const title = useSelector(largeTitleSelector);
  // @ts-ignore
  const isLoading = useSelector(isLoadingSelector);

  return (
    <>
      <TopProgressBar show={isLoading}/>
      <MobileNavigationBar title={title}/>
      <div id="home-page">
        <NavigationBar title={title}/>
        <AnimatePresence>
          <Switch>
            <Route path={rootLink} exact component={() => <></>}/>
            <Route path={passageLink} component={PassageListPage} exact />
            <Route path="/passage/:id" component={PassagePage} exact />
            <Route path={codeSnippetLink} component={SnippetPage} exact />
            <Route path={aboutLink} component={AboutPage} exact />
            <Route path={notFoundLink} component={NotFoundPage} exact />
            <Redirect from={"*"} to={notFoundLink} />
          </Switch>
        </AnimatePresence>
      </div>
    </>
  );
}

export default HomePage;