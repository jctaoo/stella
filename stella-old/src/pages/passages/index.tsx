import { graphql, PageProps } from "gatsby";
import React from "react";
import "./passages.scss";

import SEO from "../../components/SEO/SEO";
import ListTitle from "../../components/list-title/list-title";
import PassageItem from "../../components/passage-item/passage-item";
import { ListEnvironment, useFilter } from "../../componsitions/filter";
import useSiteMetadata from "../../hooks/use-site-metadata";
import BasePage from "../../layout/base-page/base-page";
import {
  getNodesFromNodeData,
  NodeContentData,
  NodeData,
} from "../../models/node-data";
import { PassageAbbr } from "../../models/passage-content";

interface PassageListPageData {
  allPassage: NodeData<PassageAbbr>;
  allCategory: NodeContentData<string>;
}

export default function PassageListPage(props: PageProps<PassageListPageData>) {
  const [tag, category] = useFilter();

  let passages = getNodesFromNodeData(props.data.allPassage);
  passages = passages.filter((item) => {
    let flag = true;
    if (tag) {
      flag = item.about.tags.map((t) => t.title).includes(tag);
    }
    if (category) {
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
    allPassage(sort: {fields: orderDate, order: DESC}) {
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
