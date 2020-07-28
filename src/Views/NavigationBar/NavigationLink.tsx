import React from "react";
import "./NavigationLink.scss"
import { useHistory } from "react-router";

interface NavigationLinkProps {
  title: string,
  to?: string,
  special?: boolean,
  selected?: boolean,
  onCLick?: () => void
}

function NavigationLink(props: NavigationLinkProps) {
  const history = useHistory()

  return (
    <span
      className={`links-list-item 
          ${props.special ? "special-links-list-item" : ""} 
          ${props.selected ? "links-list-item-selected" : ""}`
      }
      onClick={
        () => {
          if (props.to) {
            history.push(props.to);
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
