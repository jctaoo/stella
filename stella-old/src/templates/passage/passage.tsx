import { Redirect } from "@reach/router";
import { graphql, PageProps } from "gatsby";
import React from "react";

import SEO from "../../components/SEO/SEO";
import PassageDetailView from "../../components/passage-detail/passage-detail";
import { jumpToPassagePage } from "../../componsitions/filter";
import BasePage from "../../layout/base-page/base-page";
import Config from "../../models/config";
import { getNodesFromNodeData, NodeData } from "../../models/node-data";
import PageDescription from "../../models/page-description";
import { PassageDetail } from "../../models/passage-content";
import "./PassagePage.scss";

interface PassagePageData {
  allPassageDetail: NodeData<PassageDetail>;
  siteMetadata: { config: Config };
}

export default function PassagePage(props: PageProps<PassagePageData>) {
  const matchedPassages = getNodesFromNodeData(props.data.allPassageDetail);
  const currentPassage =
    matchedPassages.length > 0 ? matchedPassages[0] : undefined;

  const description: PageDescription | undefined = currentPassage
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
          topImage {
            ...ImageDataFragment
          }
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
  }
`;
