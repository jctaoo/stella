import React from "react";
import "./snippets.scss"
import SnippetItemView from "../../components/snippet-item/snippet-item";
import "./snippets.scss";
import { graphql, PageProps } from "gatsby";
import BasePage from "../../layout/base-page/base-page";
import { SnippetAbbr } from "../../models/snippet-content";
import { NodeData, getNodesFromNodeData } from "../../models/node-data";
import SEO from "../../components/SEO/SEO";
import useSiteMetadata from "../../hooks/use-site-metadata";

interface SnippetsPageData {
  allSnippet: NodeData<SnippetAbbr>
}

export default function SnippetPage(props: PageProps<SnippetsPageData>) {
  let snippets = getNodesFromNodeData(props.data.allSnippet);
  const description = useSiteMetadata().pageDescription?.snippets;
  return (
    <BasePage id="snippet-page">
      <SEO description={description} />
      <div className="snippet-list-container">
        <span className="snippet-list-title">

        </span>
        <div className="snippet-list">
          {
            snippets.map(item => {
              return (
                <SnippetItemView item={item} key={item.identifier} />
              );
            })
          }
        </div>
      </div>
    </BasePage>
  );
}

export const query = graphql`
  {
    allSnippet {
      edges {
        node {
          identifier
          title
          abbr
          codeRaw
          about {
            category
            tags {
              id
              title
            }
            updateTimes
          }
        }
      }
    }
  }
`