import React from "react";
import "./snippets.scss";
import "./snippets.scss";
import { graphql, PageProps } from "gatsby";
import BasePage from "../../layout/base-page/base-page";
import { SnippetDetail } from "../../models/snippet-content";
import {
  NodeData,
  getNodesFromNodeData,
  NodeContentData,
} from "../../models/node-data";
import SEO from "../../components/SEO/SEO";
import useSiteMetadata from "../../hooks/use-site-metadata";
import PassageDetail, {
  PassageDetailViewMode,
} from "../../components/passage-detail/passage-detail";
import { Tag } from "../../models/base-content";
import ListTitle, {
  ListTitleMode,
} from "../../components/list-title/list-title";
import { useFilter } from "../../componsitions/filter";

interface SnippetsPageData {
  allSnippet: NodeData<SnippetDetail>;
}

export default function SnippetPage(props: PageProps<SnippetsPageData>) {
  const [tag, category] = useFilter();

  let snippets = getNodesFromNodeData(props.data.allSnippet);
  snippets = snippets.filter((item) => {
    let flag = true;
    if (!!tag) {
      flag = item.item.about.tags
        .map((t) => t.title.toLowerCase())
        .includes(tag.toLowerCase());
    }
    if (!!category) {
      flag = item.item.about.category?.toLowerCase() === category;
    }
    return flag;
  });

  const description = useSiteMetadata().pageDescription?.snippets;

  return (
    <BasePage id="snippet-page">
      <SEO description={description} />
      <div className="snippet-list-container">
        <div className="snippet-list-header-container">
          <ListTitle mode={ListTitleMode.snippets} />
        </div>
        <div className="snippet-list">
          {snippets.map((item) => {
            return (
              <PassageDetail
                className="snippet-item"
                passage={item}
                mode={PassageDetailViewMode.Partial}
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
`;
