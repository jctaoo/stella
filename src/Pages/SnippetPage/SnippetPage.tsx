import React from "react";
import BasePage from "../BasePage";
import "./SnippetPage.scss"
import SnippetItemView from "../../Views/SnippetItemView/SnippetItemView";
import { useSelector } from "react-redux";
import AppState from "../../Models/AppState";
import PassageAbbr from "../../Models/Passage";
import "./SnippetPage.scss";

function SnippetPage() {

  let snippets = useSelector<AppState, PassageAbbr[]>(state => state.snippets);

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

export default SnippetPage;
