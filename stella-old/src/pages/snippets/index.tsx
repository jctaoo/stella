import { graphql, PageProps } from "gatsby";
import React from "react";
import "./snippets.scss";
import "./snippets.scss";

import SEO from "../../components/SEO/SEO";
import ListTitle from "../../components/list-title/list-title";
import PassageDetailView, {
  PassageDetailViewMode,
} from "../../components/passage-detail/passage-detail";
import {
  jumpToSnippetsPage,
  ListEnvironment,
  useFilter,
} from "../../componsitions/filter";
import useSiteMetadata from "../../hooks/use-site-metadata";
import BasePage from "../../layout/base-page/base-page";
import { getNodesFromNodeData, NodeData } from "../../models/node-data";
import { SnippetDetail } from "../../models/snippet-content";

interface SnippetsPageData {
  allSnippet: NodeData<SnippetDetail>;
}

export default function SnippetPage(props: PageProps<SnippetsPageData>) {
  const [tag, category] = useFilter();

  let snippets = getNodesFromNodeData(props.data.allSnippet);
  snippets = snippets.filter((item) => {
    let flag = true;
    if (tag) {
      flag = item.item.about.tags.map((t) => t.title).includes(tag);
    }
    if (category) {
      flag = item.item.about.category === category;
    }
    return flag;
  });

  const description = useSiteMetadata().pageDescription?.snippets;

  return (
    <BasePage id="snippet-page">
      <SEO description={description} />
      <div className="snippet-list-container">
        <div className="snippet-list-header-container">
          <ListTitle env={ListEnvironment.snippets} shrink />
        </div>
        <div className="snippet-list">
          {snippets.map((item) => {
            return (
              <PassageDetailView
                className="snippet-item"
                passage={item}
                mode={PassageDetailViewMode.Partial}
                key={item.item.identifier}
                onClickCategory={(_, category) =>
                  jumpToSnippetsPage({ category })
                }
                onClickTag={(_, tag) => jumpToSnippetsPage({ tag: tag.title })}
              />
            );
          })}
        </div>
      </div>
    </BasePage>
  );
}

export const query = graphql`
  {
    allSnippet(sort: {fields: orderDate, order: DESC}) {
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
`;
