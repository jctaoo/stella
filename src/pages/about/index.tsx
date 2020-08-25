import React from "react";
import "./about.scss";
import BasePage from "../../layout/base-page/base-page";
import { PassageDetail } from "../../models/passage-content";
import PassageDetailView from "../../components/passage-detail/passage-detail";
import { graphql, PageProps } from "gatsby";
import Config from "../../models/config";
import { Redirect } from "@reach/router";

interface AboutPageData {
  about?: PassageDetail
  site: { siteMetadata: { config: Config } }
}

export default function AboutPage(props: PageProps<AboutPageData>) {
  const passage = props.data.about
  const discusConfig = props.data.site.siteMetadata.config.discus
  return (
    !!passage ?
    <BasePage id="about-page">
      <PassageDetailView passage={passage} disqusConfig={discusConfig} />
    </BasePage> :
    <Redirect noThrow to={"/404"}/>
  );
}

export const query = graphql`
  {
    about {
      item {
        identifier
        title
        abbr
        about {
          updateTimes
          tags {
            id
            title
          }
          category
          readTime
        }
      }
      content
      topImage
      circleImage
    }
    site {
      siteMetadata {
        config {
          discus {
            shortName
          }
        }
      }
    }
  }
`
