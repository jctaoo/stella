import React from "react";
import "./NavigationLink.scoped.scss"
import { useHistory } from "react-router";

function NavigationLink({title, to, special = false, selected = false}: {title: string, to: string, special?: boolean, selected?: boolean}) {
  const history = useHistory()

  return (
    <span className={`links-list-item ${special ? "special-links-list-item" : ""} ${selected ? "links-list-item-selected" : ""}`} onClick={() => {
      history.push(to)
    }}>
      <span className="links-list-item-label">
        {title}
      </span>
      <span className="links-list-item-indicator-container">
        <span className="links-list-item-indicator">
        </span>
      </span>
    </span>
  );
}

export default NavigationLink;
