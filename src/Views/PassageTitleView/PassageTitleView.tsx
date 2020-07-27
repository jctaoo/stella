import React from "react";
import { useHistory } from "react-router";
import "./PassageTitleView.scoped.scss"

function PassageTitleView({title, onClick = () => {}}: {title: string, onClick?: VoidFunction}) {
  return (
    <div className="passage-item-title-container">
      <span className="passage-item-title" onClick={onClick}>
        <h2 className="passage-item-title-label">{title}</h2>
        <span className="passage-item-title-indicator-container">
          <span className="passage-item-title-indicator">
          </span>
        </span>
      </span>
    </div>
  )
}

export default PassageTitleView