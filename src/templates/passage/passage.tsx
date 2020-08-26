import React from "react"
import "./PassagePage.scss"
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { PassageDetail } from "../../models/passage-content";
import PassageDetailView from "../../components/passage-detail/passage-detail";
import Config from "../../models/config";
import BasePage from "../../layout/base-page/base-page";
import { Redirect } from "@reach/router";
import { NodeData, getNodesFromNodeData } from "../../models/node-data";

interface PassagePageData {
  allPassageDetail: NodeData<PassageDetail>
  siteMetadata: { config: Config }
}

export default function PassagePage(props: PageProps<PassagePageData>) {
  console.log(props.data)

  const matchedPassages = getNodesFromNodeData(props.data.allPassageDetail)
  const currentPassage = matchedPassages.length > 0 ? matchedPassages[0] : undefined;
  const config = props.data.siteMetadata.config.discus;

  const isNotFound = !currentPassage

  return isNotFound ?
    <Redirect noThrow to={"/404"}/> :
    (() => {
      const passage = currentPassage as PassageDetail;
      return (
        <BasePage id="passage-page">
          <PassageDetailView passage={passage} disqusConfig={config}/>
        </BasePage>
      );
    })()
}

export const query = graphql`
  query($identifier: String!) {
    allPassageDetail(filter: {item: {identifier: {eq: $identifier}}}) {
      edges {
        node {
          content
          topImage
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
        discus {
          shortName
        }
      }
    }
  }
`;