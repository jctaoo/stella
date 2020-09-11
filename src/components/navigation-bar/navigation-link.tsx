import React from "react";
import "./navigation-link.scss";
import { navigate } from "gatsby";

interface NavigationLinkProps {
  title: string,
  to?: string,
  special?: boolean,
  selected?: boolean,
  onCLick?: () => void
}

function NavigationLink(props: NavigationLinkProps) {
  return (
    <span
      className={`links-list-item 
          ${props.special ? "special-links-list-item" : ""} 
          ${props.selected ? "links-list-item-selected" : ""}`
      }
      onClick={
        async () => {
          if (props.to) {
            await navigate(props.to, { replace: true });
          }
          if (props.onCLick) {
            props.onCLick();
          }
        }
      }>
      <span className="links-list-item-label">
        {props.title}
      </span>
      <span className="links-list-item-indicator-container">
        <span className="links-list-item-indicator">
        </span>
      </span>
    </span>
  );
}

export default NavigationLink;
