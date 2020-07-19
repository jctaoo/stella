import React from 'react'
import './NavigationBar.scoped.scss'
import NavigationLink from "./NavigationLink";
import MediaInformation from "./MediaInformation";
import { useHistory, useLocation } from "react-router";
import { notFoundLink, rootLink, routeLinks } from "../../Routes";

function NavigationBar() {
  const history = useHistory()
  const location = useLocation()
  const goToHome = () => {
    history.push(rootLink)
  }

  const isSpecial = routeLinks.filter((item) => item.link === location.pathname)[0]?.special ?? false
  const showSpecial = location.pathname === rootLink || location.pathname == notFoundLink || isSpecial

  return (
    <div id="navigation-bar">
      <div id="navigation-bar-content">
        <h1 id="blog-name-label" onClick={goToHome}>Jctaoo.</h1>
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
        <MediaInformation/>
      </div>
    </div>
  );
}

export default NavigationBar