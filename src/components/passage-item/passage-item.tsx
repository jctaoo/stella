import React from "react"
import PassageAbout from "../passage-about/passage-about";
import "./passage-item.scss"
import PassageTitle from "../passage-title/passage-title";
import { PassageAbbr } from "../../models/passage-content";
import { navigate } from "gatsby";

function PassageItem({passage}: { passage: PassageAbbr }) {
  const goToPassage = async (id: string) => {
    await navigate(`/passage/${id}`)
  };
  
  return (
    <span className="passage-item">
      <PassageTitle title={passage.title} onClick={async () => { await goToPassage(passage.identifier) }}/>
      <span className="passage-item-abbreviation">
        <p className="passage-item-abbreviation-text">
          {passage.abbr}...
        </p>
      </span>
      <PassageAbout {...passage.about}/>
    </span>
  );
}

export default PassageItem
