import "./navigation-bar.scss";
import { motion } from "framer-motion";
import { navigate } from "gatsby";
import React from "react";
import { useSelector } from "react-redux";

import useSiteMetadata from "../../hooks/use-site-metadata";
import AppState from "../../models/app-state";
import GlobalInformation from "../global-information/GlobalInformation";
import MediaInformation from "../media-information/media-information";

import NavigationLink from "./navigation-link";

export default function NavigationBar() {
  const pathname = useSelector((state: AppState) => state.currentPathname);

  const siteMetadata = useSiteMetadata();
  const passagesName =
    siteMetadata.routeConfigurations?.passages?.title ?? "passages";
  const snippetsName =
    siteMetadata.routeConfigurations?.snippets?.title ?? "snippets";
  const aboutName = siteMetadata.routeConfigurations?.about?.title ?? "about";

  const goToHome = async () => {
    await navigate("/", { replace: true });
  };

  const isPassage = pathname.startsWith("/passage");

  const isHome = pathname === "/";

  const title = siteMetadata.config.homeLargeTitle
    ? siteMetadata.config.homeLargeTitle
    : siteMetadata.config.siteName;

  const bannerText = siteMetadata.bannerText;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="navigation-bar"
      className={!isHome ? "navigation-bar-shrink" : ""}
    >
      <div id="navigation-bar-content">
        <h1 id="blog-name-label" onClick={goToHome}>
          {title}
        </h1>
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
        <ul
          id="links-list-passage-list"
          className={!isPassage ? "links-list-passage-list-hide" : ""}
        >
          {/* PASS */}
        </ul>
        <MediaInformation className="navigation-bar-media-info" />
      </div>
      {bannerText ? <GlobalInformation text={bannerText} /> : <></>}
    </motion.div>
  );
}
