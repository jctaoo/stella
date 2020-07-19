import React from "react";
import "./HomePage.scss"
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import NavigationBar from "../../Views/NavigationBar/NavigationBar";
import PassageListPage from "../PassageListPage/PassageListPage";
import PassagePage from "../PassagePage/PassagePage";
import { notFoundLink } from "../../Routes";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function HomePage() {
  return (
    <div id="home-page">
      <BrowserRouter>
        <NavigationBar/>
        <Route path="/" component={() => <></>}/>
        <Route path="/passage" component={PassageListPage} exact />
        <Route path="/passage/:id" component={PassagePage} exact />
        <Route path={notFoundLink} component={NotFoundPage} exact />
        <Redirect from="*" to={notFoundLink}/>
      </BrowserRouter>
    </div>
  );
}

export default HomePage;