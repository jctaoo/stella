import React from "react"
import PassageAboutView from "../PassageAboutView/PassageAboutView";
import "./PassageItemView.scoped.scss"
import { Passage } from "../../Models/PassageItem";
import PassageTitleView from "../PassageTitleView/PassageTitleView";

function PassageItemView({passage}: { passage: Passage }) {
  return (
    <span className="passage-item">
      <PassageTitleView title={passage.title}/>
      <span className="passage-item-abbreviation">
        <p className="passage-item-abbreviation-text">
          {passage.abbr}
        </p>
      </span>
      <PassageAboutView {...passage.about}/>
    </span>
  );
}

export default PassageItemView