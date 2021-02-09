import React from "react";
import "./route-label.scss";

function RouteLabel({
  className = "",
  title,
}: {
  className?: string;
  title: string;
}) {
  return (
    <span className={`route-label ${className}`}>
      <span className="route-label-title">
        <h1 className="route-label-title-label">{title}</h1>
        <span className="route-label-title-indicator-container">
          <span className="route-label-title-indicator"></span>
        </span>
      </span>
    </span>
  );
}

export default RouteLabel;
