import React from 'react'
import './NavigationBar.scss'
import NavigationLink from "./NavigationLink";
import MediaInformationView from "../MediaInformationView/MediaInformationView";
import { useHistory, useLocation } from "react-router";
import { getRouteItemOfPath, notFoundLink, rootLink, routeLinks } from "../../Routes";

function NavigationBar({title}: {title: string}) {
  const history = useHistory()
  const location = useLocation()
  const goToHome = () => {
    history.push(rootLink)
  }

  const isSpecial = getRouteItemOfPath(location.pathname)?.special ?? false
  const showSpecial = location.pathname === rootLink || location.pathname === notFoundLink || isSpecial
  const isHome = location.pathname === rootLink

  return (
    <div id="navigation-bar" className={!isHome ? "navigation-bar-shrink" : ""}>
      <div id="navigation-bar-content">
        <h1 id="blog-name-label" onClick={goToHome}>{title}</h1>
        <ul id="links-list">
          {
            routeLinks.filter((item) => {
              return showSpecial ? true : !item.special
            }).map((item, index) => (
              <NavigationLink
                title={item.title}
                to={item.link}
                special={item.special}
                selected={location.pathname.startsWith(item.link)}
                key={index}
              />
            ))
          }
        </ul>
        <MediaInformationView className="navigation-bar-media-info"/>
      </div>
    </div>
  );
}

export default NavigationBar