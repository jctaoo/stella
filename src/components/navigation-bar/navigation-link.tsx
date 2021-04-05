import { navigate } from "gatsby";
import React from "react";
import "./navigation-link.scss";

interface NavigationLinkProps {
  title: string;
  to?: string;
  selected?: boolean;
  onCLick?: () => void;
}

function NavigationLink(props: NavigationLinkProps) {
  return (
    <li
      className={`links-list-item 
          ${props.selected ? "links-list-item-selected" : ""}`}
      onClick={async () => {
        if (props.to) {
          await navigate(props.to, { replace: true });
        }
        if (props.onCLick) {
          props.onCLick();
        }
      }}
    >
      <span className="links-list-item-label">{props.title}</span>
      <span className="links-list-item-indicator-container">
        <span className="links-list-item-indicator" />
      </span>
    </li>
  );
}

export default NavigationLink;
