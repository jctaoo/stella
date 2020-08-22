import React from "react";
import "./snippets.scss"
import SnippetItemView from "../../components/snippet-item/snippet-item";
import "./snippets.scss";
import { graphql, PageProps } from "gatsby";
import BasePage from "../../layout/base-page/base-page";
import { SnippetAbbr } from "../../models/snippet-content";

interface SnippetsPageData {
  allSnippets: SnippetAbbr[]
}

export default function SnippetPage(props: PageProps<SnippetsPageData>) {

  let snippets = props.data.allSnippets;

  return (
    <BasePage id="snippet-page">
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
    allSnippets {
      identifier
      title
      abbr
      codeRaw
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
  }
`