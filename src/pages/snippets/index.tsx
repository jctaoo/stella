import React from "react";
import "./snippets.scss"
import "./snippets.scss";
import { graphql, PageProps } from "gatsby";
import BasePage from "../../layout/base-page/base-page";
import { SnippetDetail } from "../../models/snippet-content";
import { NodeData, getNodesFromNodeData } from "../../models/node-data";
import SEO from "../../components/SEO/SEO";
import useSiteMetadata from "../../hooks/use-site-metadata";
import PassageDetail, { PassageDetailViewMode } from "../../components/passage-detail/passage-detail";

interface SnippetsPageData {
  allSnippet: NodeData<SnippetDetail>
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
                <PassageDetail
                  className="snippet-item"
                  passage={item}
                  mode={PassageDetailViewMode.Partial}
                />
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
          content
          item {
            abbr
            about {
              category
              tags {
                title
                id
              }
              readTime
              updateTimes
            }
            identifier
            title
            codeRaw
          }
        }
      }
    }
  }
`
