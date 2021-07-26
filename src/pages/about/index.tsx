import { Redirect } from "@reach/router";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import React from "react";

import SEO from "../../components/SEO/SEO";
import PassageDetailView from "../../components/passage-detail/passage-detail";
import useSiteMetadata from "../../hooks/use-site-metadata";
import BasePage from "../../layout/base-page/base-page";
import Config from "../../models/config";
import { PassageDetail } from "../../models/passage-content";
import "./about.scss";

function useAbout(): PassageDetail | undefined {
  const result = useStaticQuery<{ about?: PassageDetail }>(graphql`
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
        topImage {
          ...ImageDataFragment
        }
        circleImage
      }
    }
  `);
  return result.about;
}

export default function AboutPage() {
  const passage = useAbout();

  if (!passage) {
    return <Redirect noThrow to={"/404"} />;
  }

  const siteMetadata = useSiteMetadata();
  const description = siteMetadata.pageDescription?.about;

  return (
    <BasePage id="about-page">
      <SEO description={description} />
      <PassageDetailView
        passage={passage}
        showFooter={false}
        onClickCategory={() => {}}
        onClickTag={() => {}}
      />
    </BasePage>
  );
}
