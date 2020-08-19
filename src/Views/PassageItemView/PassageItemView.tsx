import React from "react"
import PassageAboutView from "../PassageAboutView/PassageAboutView";
import "./PassageItemView.scss"
import PassageAbbr from "../../Models/Passage";
import PassageTitleView from "../PassageTitleView/PassageTitleView";
import { useHistory } from "react-router";

function PassageItemView({passage}: { passage: PassageAbbr }) {
  const history = useHistory();
  const goToPassage = (id: string) => {
    history.push(`/passage/${id}`)
  };
  
  return (
    <span className="passage-item">
      <PassageTitleView title={passage.title} onClick={() => { goToPassage(passage.identifier) }}/>
      <span className="passage-item-abbreviation">
        <p className="passage-item-abbreviation-text">
          {passage.abbr}...
        </p>
      </span>
      <PassageAboutView {...passage.about}/>
    </span>
  );
}

export default PassageItemView
