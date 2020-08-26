import React, { useState } from "react";
import MediaInformation from "../media-information/media-information";
import "./mobile-navigation-bar.scss";
import RouteLabel from "./route-label";
import { graphql, navigate, useStaticQuery } from "gatsby";
import { RouteConfiguration } from "../../models/route-configuration";

interface MobileNavigationBarData {
  siteMetadata: {
    routeConfigurations: {
      passages?: RouteConfiguration
      snippets?: RouteConfiguration
      about?: RouteConfiguration
    }
    config: {
      homeLargeTitle?: string
      siteName: string
    }
  }
}

function MobileNavigationBar() {
  const [pathname, setPathname] = useState("/");

  const data = useStaticQuery<MobileNavigationBarData>(graphql`
    {
      siteMetadata {
        config {
          homeLargeTitle
          siteName
        }
      }
    }
  `);
  const goToHome = async () => {
    await navigate("/", { replace: true });
  }

  const isHome = pathname === "/";
  const routeTitle = "$TITLE$"

  const title = !!data.siteMetadata.config.homeLargeTitle ? data.siteMetadata.config.homeLargeTitle : data.siteMetadata.config.siteName

  return (
    <div id="mobile-navigation-bar" className={isHome ? "hide" : ""}>
      <div id="mobile-navigation-bar-header">
        <span id="mobile-navigation-bar-title">
          <span id="mobile-navigation-bar-title-home-label" onClick={goToHome}>
            <h1>{title}</h1>
          </span>
          {
            routeTitle ?
              <>
                <span className="mobile-navigation-bar-title-divider"/>
                <RouteLabel className="mobile-navigation-bar-title-route-label" title={routeTitle} />
              </>
            : null
          }
        </span>
      </div>
      <MediaInformation className="mobile-navigation-bar-media-info"/>
      <span className="mobile-navigation-bar-bottom-divider"/>
    </div>
  );
}

export default MobileNavigationBar;