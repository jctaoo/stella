import React, { useState } from "react";
import MediaInformation from "../media-information/media-information";
import "./mobile-navigation-bar.scss";
import RouteLabel from "./route-label";
import { navigate } from "gatsby";
import { useSelector } from "react-redux";
import AppState from "../../models/app-state";
import useSiteMetadata from "../../hooks/use-site-metadata";

function MobileNavigationBar() {
  const pathname = useSelector((state: AppState) => state.currentPathname);

  const siteMetadata = useSiteMetadata();
  const goToHome = async () => {
    await navigate("/", { replace: true });
  };

  const isHome = pathname === "/";
  const routeTitle = ((pathname: string): string | null => {
    if (pathname.startsWith("/passage")) {
      return siteMetadata.routeConfigurations.passages.title;
    } else if (pathname.startsWith("/about")) {
      return siteMetadata.routeConfigurations.about.title;
    } else if (pathname.startsWith("/snippets")) {
      return siteMetadata.routeConfigurations.snippets.title;
    }
    return null;
  })(pathname);

  const title = !!siteMetadata.config.homeLargeTitle
    ? siteMetadata.config.homeLargeTitle
    : siteMetadata.config.siteName;

  return (
    <div id="mobile-navigation-bar" className={isHome ? "hide" : ""}>
      <div id="mobile-navigation-bar-header">
        <span id="mobile-navigation-bar-title">
          <span id="mobile-navigation-bar-title-home-label" onClick={goToHome}>
            <h1>{title}</h1>
          </span>
          {!!routeTitle ? (
            <>
              <span className="mobile-navigation-bar-title-divider" />
              <RouteLabel
                className="mobile-navigation-bar-title-route-label"
                title={routeTitle}
              />
            </>
          ) : null}
        </span>
      </div>
      <MediaInformation className="mobile-navigation-bar-media-info" />
      <span className="mobile-navigation-bar-bottom-divider" />
    </div>
  );
}

export default MobileNavigationBar;
