import React from "react";
import "./PassagePage.scss";
import { graphql, PageProps } from "gatsby";
import { PassageDetail } from "../../models/passage-content";
import PassageDetailView from "../../components/passage-detail/passage-detail";
import Config from "../../models/config";
import BasePage from "../../layout/base-page/base-page";
import { Redirect } from "@reach/router";
import { NodeData, getNodesFromNodeData } from "../../models/node-data";
import SEO from "../../components/SEO/SEO";
import PageDescription from "../../models/page-description";
import { jumpToPassagePage } from "../../componsitions/filter";

interface PassagePageData {
  allPassageDetail: NodeData<PassageDetail>;
  siteMetadata: { config: Config };
}

export default function PassagePage(props: PageProps<PassagePageData>) {
  const matchedPassages = getNodesFromNodeData(props.data.allPassageDetail);
  const currentPassage =
    matchedPassages.length > 0 ? matchedPassages[0] : undefined;
  const config = props.data.siteMetadata.config.disqus;

  const description: PageDescription | undefined = !!currentPassage
    ? {
        title: currentPassage.item.title,
        keywords: currentPassage.item.about.tags.map((t) => t.title),
        description: currentPassage.item.abbr,
        largeImage: currentPassage.topImage,
        largeImageAlt: currentPassage.topImageAlt,
      }
    : undefined;

  return !currentPassage ? (
    <Redirect noThrow to={"/404"} />
  ) : (
    <BasePage id="passage-page">
      <SEO description={description} />
      <PassageDetailView
        passage={currentPassage}
        disqusConfig={config}
        onClickCategory={(_, category) => jumpToPassagePage({ category })}
        onClickTag={(_, tag) => jumpToPassagePage({ tag: tag.title })}
      />
    </BasePage>
  );
}

export const query = graphql`
  query($identifier: String!) {
    allPassageDetail(filter: { item: { identifier: { eq: $identifier } } }) {
      edges {
        node {
          content
          topImage
          topImageAlt
          circleImage
          item {
            abbr
            identifier
            title
            about {
              category
              readTime
              updateTimes
              tags {
                id
                title
              }
            }
          }
        }
      }
    }
    siteMetadata {
      config {
        disqus {
          shortName
          developmentShortName
        }
      }
    }
  }
`;
