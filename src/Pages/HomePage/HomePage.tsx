import React from "react";
import "./HomePage.scss"
import { Redirect, Route, Switch } from "react-router-dom";
import NavigationBar from "../../Views/NavigationBar/NavigationBar";
import PassageListPage from "../PassageListPage/PassageListPage";
import PassagePage from "../PassagePage/PassagePage";
import { notFoundLink } from "../../Routes";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { AnimatePresence } from "framer-motion";
import MobileNavigationBar from "../../Views/MobileNavigationBar/MobileNavigationBar";
import { useSelector } from "react-redux";
import { largeTitleSelector } from "../../Services/SelectLargeTitle";
import { isLoadingSelector } from "../../Services/SelectLoading";
import TopProgressBar from "../../Views/TopProgressBar/TopProgressBar";
import AboutPage from "../AboutPage/AboutPage";
import GalleryPage from "../GalleryPage/GalleryPage";

function HomePage() {
  // const location = useLocation()
  // TODO exit before enter
  // https://www.youtube.com/watch?v=qJt-FtzJ5fo

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
            <Route path="/" exact component={() => <></>}/>
            <Route path="/passage" component={PassageListPage} exact />
            <Route path="/passage/tag/:tag" component={PassageListPage} exact />
            <Route path="/passage/category/:category" component={PassageListPage} exact />
            <Route path="/passage/:id" component={PassagePage} exact />
            <Route path="/about" component={AboutPage} exact />
            <Route path="/gallery" component={GalleryPage} exact />
            <Route path={notFoundLink} component={NotFoundPage} exact />
            <Redirect from={"*"} to={notFoundLink} />
          </Switch>
        </AnimatePresence>
      </div>
    </>
  );
}

export default HomePage;