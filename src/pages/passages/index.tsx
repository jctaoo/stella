import React from "react";
import "./passages.scss";
import { graphql, PageProps } from "gatsby";
import { Tag } from "../../models/base-content";
import BasePage from "../../layout/base-page/base-page";
import PassageItem from "../../components/passage-item/passage-item";
import { PassageAbbr } from "../../models/passage-content";
import {
  getNodesFromNodeData,
  NodeContentData,
  NodeData,
} from "../../models/node-data";
import SEO from "../../components/SEO/SEO";
import useSiteMetadata from "../../hooks/use-site-metadata";
import { useFilter, ListEnvironment } from "../../componsitions/filter";
import ListTitle from "../../components/list-title/list-title";

interface PassageListPageData {
  allPassage: NodeData<PassageAbbr>;
  allCategory: NodeContentData<string>;
}

export default function PassageListPage(props: PageProps<PassageListPageData>) {
  const [tag, category] = useFilter();

  let passages = getNodesFromNodeData(props.data.allPassage);
  passages = passages.filter((item) => {
    let flag = true;
    if (!!tag) {
      flag = item.about.tags.map((t) => t.title).includes(tag);
    }
    if (!!category) {
      flag = item.about.category === category;
    }
    return flag;
  });

  const description = useSiteMetadata().pageDescription?.passages;

  return (
    <BasePage id="passage-list-page">
      <SEO description={description} />
      <div className="passage-list-container">
        <ListTitle env={ListEnvironment.passages} />
        <div className="passage-list">
          {passages.map((item) => (
            <PassageItem passage={item} key={item.identifier} />
          ))}
        </div>
      </div>
    </BasePage>
  );
}

export const query = graphql`
  {
    allPassage {
      edges {
        node {
          title
          identifier
          abbr
          about {
            category
            readTime
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
`;
