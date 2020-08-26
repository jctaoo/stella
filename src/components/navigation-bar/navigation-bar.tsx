import React, { useState } from 'react'
import './navigation-bar.scss'
import NavigationLink from "./navigation-link";
import MediaInformation from "../media-information/media-information";
import { navigate } from "gatsby";
import { motion } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import { RouteConfiguration } from "../../models/route-configuration";
import { useDispatch, useSelector } from "react-redux";
import AppState from '../../models/app-state';
import { Actions } from '../../state';

interface NavigationBarData {
  siteMetadata: {
    routeConfigurations: {
      passages: RouteConfiguration
      snippets: RouteConfiguration
      about: RouteConfiguration
    }
    config: {
      homeLargeTitle?: string
      siteName: string
    }
  }
}

export default function NavigationBar() {

  const pathname = useSelector((state: AppState) => state.currentPathname);

  const data = useStaticQuery<NavigationBarData>(graphql`
    {
      siteMetadata {
        routeConfigurations {
          about { title }
          passages { title }
          snippets { title }
        }
        config {
          homeLargeTitle
          siteName
        }
      }
    }
  `);
  const passagesName = data.siteMetadata.routeConfigurations?.passages?.title ?? "passages";
  const snippetsName = data.siteMetadata.routeConfigurations?.snippets?.title ?? "snippets";
  const aboutName = data.siteMetadata.routeConfigurations?.about?.title ?? "about";

  const goToHome = async () => {
    await navigate("/", { replace: true });
  }

  const isPassage = pathname.startsWith("/passage");

  // #TODO
  const isSpecial = false
  const showSpecial = pathname === "/" || pathname === "/404" || isSpecial
  const isHome = pathname === "/"

  const title = !!data.siteMetadata.config.homeLargeTitle ? data.siteMetadata.config.homeLargeTitle : data.siteMetadata.config.siteName

  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      id="navigation-bar"
      className={!isHome ? "navigation-bar-shrink" : ""}
    >
      <div id="navigation-bar-content">
        <h1 id="blog-name-label" onClick={goToHome}>{title}</h1>
        <ul id="links-list">
          <NavigationLink
            title={passagesName}
            to={"/passages"}
            selected={pathname.startsWith("/passage")}
          />
          <NavigationLink
            title={snippetsName}
            to={"/snippets"}
            selected={pathname.startsWith("/snippets")}
          />
          <NavigationLink
            title={aboutName}
            to={"/about"}
            selected={pathname.startsWith("/about")}
          />
        </ul>
        <ul id="links-list-passage-list" className={!isPassage ? "links-list-passage-list-hide" : ""}>
          {/* PASS */}
        </ul>
        <MediaInformation className="navigation-bar-media-info"/>
      </div>
    </motion.div>
  );
}
