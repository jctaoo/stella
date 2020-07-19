import React from "react";
import { useHistory } from "react-router";
import "./PassageTitleView.scoped.scss"

function PassageTitleView({title}: {title: string}) {
  const history = useHistory()
  const goToPassage = (id: string) => {
    history.push(`/passage/${id}`)
  }
  // TODO id

  return (
    <div className="passage-item-title-container">
      <span className="passage-item-title" onClick={() => goToPassage("test")}>
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