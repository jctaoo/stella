import { Redirect } from "@reach/router";
import { graphql, PageProps } from "gatsby";
import React from "react";

import SEO from "../../components/SEO/SEO";
import PassageDetailView from "../../components/passage-detail/passage-detail";
import useSiteMetadata from "../../hooks/use-site-metadata";
import BasePage from "../../layout/base-page/base-page";
import Config from "../../models/config";
import { PassageDetail } from "../../models/passage-content";
import "./about.scss";

interface AboutPageData {
  about?: PassageDetail;
  siteMetadata: { config: Config };
}

export default function AboutPage(props: PageProps<AboutPageData>) {
  const passage = props.data.about;
  const siteMetadata = useSiteMetadata();
  const description = siteMetadata.pageDescription?.about;
  const disqusConfig = siteMetadata.config.disqus;
  return passage ? (
    <BasePage id="about-page">
      <SEO description={description} />
      <PassageDetailView
        passage={passage}
        disqusConfig={disqusConfig}
        showFooter={false}
      />
    </BasePage>
  ) : (
    <Redirect noThrow to={"/404"} />
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
  }
`;
