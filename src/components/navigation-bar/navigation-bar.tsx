import React, { useState } from 'react'
import './navigation-bar.scss'
import NavigationLink from "./navigation-link";
import MediaInformation from "../media-information/media-information";
import { navigate } from "gatsby";
import { motion } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import { RouteConfiguration } from "../../models/route-configuration";

interface NavigationBarData {
  site: {
    siteMetadata: {
      routeConfigurations: {
        passages?: RouteConfiguration
        snippets?: RouteConfiguration
        about?: RouteConfiguration
      }
      title: string
    }
  }
}

export default function NavigationBar() {

  const [pathname, setPathname] = useState(window?.location.pathname ?? "/");

  const data = useStaticQuery<NavigationBarData>(graphql`
    {
      site {
        siteMetadata {
          routeConfigurations {
            about { title }
            passages { title }
            snippets { title }
          }
          title
        }
      }
    }
  `);
  const passagesName = data.site.siteMetadata.routeConfigurations?.passages?.title ?? "passages";
  const snippetsName = data.site.siteMetadata.routeConfigurations?.snippets?.title ?? "snippets";
  const aboutName = data.site.siteMetadata.routeConfigurations?.about?.title ?? "about";

  const goToHome = async () => {
    await navigate("/", { replace: true });
    setPathname("/");
  }

  const isPassage = pathname.startsWith("/passage");

  // #TODO
  const isSpecial = false
  const showSpecial = pathname === "/" || pathname === "/noutfound" || isSpecial
  const isHome = pathname === "/"

  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      id="navigation-bar"
      className={!isHome ? "navigation-bar-shrink" : ""}
    >
      <div id="navigation-bar-content">
        <h1 id="blog-name-label" onClick={goToHome}>{data.site.siteMetadata.title}</h1>
        <ul id="links-list">
          <NavigationLink
            title={passagesName}
            to={"/passages"}
            selected={pathname.startsWith("/passages")}
            onCLick={() => { setPathname("/passages") }}
          />
          <NavigationLink
            title={snippetsName}
            to={"/snippets"}
            selected={pathname.startsWith("/snippets")}
            onCLick={() => { setPathname("/snippets") }}
          />
          <NavigationLink
            title={aboutName}
            to={"/about"}
            selected={pathname.startsWith("/about")}
            onCLick={() => { setPathname("/about") }}
          />
        </ul>
        <ul id="links-list-passage-list" className={!isPassage ? "links-list-passage-list-hide" : ""}>

        </ul>
        <MediaInformation className="navigation-bar-media-info"/>
      </div>
    </motion.div>
  );
}
