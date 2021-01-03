import React from "react";
import "./about.scss";
import BasePage from "../../layout/base-page/base-page";
import { PassageDetail } from "../../models/passage-content";
import PassageDetailView from "../../components/passage-detail/passage-detail";
import { graphql, PageProps } from "gatsby";
import Config from "../../models/config";
import { Redirect } from "@reach/router";
import SEO from "../../components/SEO/SEO";
import useSiteMetadata from "../../hooks/use-site-metadata";

interface AboutPageData {
  about?: PassageDetail
  siteMetadata: { config: Config }
}

export default function AboutPage(props: PageProps<AboutPageData>) {
  const passage = props.data.about
  const disqusConfig = props.data.siteMetadata.config.disqus
  const description = useSiteMetadata().pageDescription?.about;
  return (
    !!passage ?
    <BasePage id="about-page">
      <SEO description={description} />
      <PassageDetailView passage={passage} disqusConfig={disqusConfig} />
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
    siteMetadata {
      config {
        disqus {
          shortName
        }
      }
    }
  }
`
