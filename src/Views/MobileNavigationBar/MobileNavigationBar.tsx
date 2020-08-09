import React from "react";
import MediaInformationView from "../MediaInformationView/MediaInformationView";
import "./MobileNavigationBar.scss";
import { useHistory, useLocation } from "react-router";
import { getRouteItemOfPath, rootLink } from "../../Routes";
import RouteLabelView from "./RouteLabelView";

function MobileNavigationBar({title}: {title: string}) {
  const history = useHistory()
  const location = useLocation();
  const goToHome = () => {
    history.push(rootLink)
  }

  const isHome = location.pathname === rootLink;
  const routeTitle = getRouteItemOfPath(location.pathname)?.title

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
                <RouteLabelView className="mobile-navigation-bar-title-route-label" title={routeTitle} />
              </>
            : null
          }
        </span>
      </div>
      <MediaInformationView className="mobile-navigation-bar-media-info"/>
      <span className="mobile-navigation-bar-bottom-divider"/>
    </div>
  );
}

export default MobileNavigationBar;