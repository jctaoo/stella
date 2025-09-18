import { navigate } from "gatsby";
import React from "react";

import { jumpToPassagePage } from "../../componsitions/filter";
import { PassageAbbr } from "../../models/passage-content";
import PassageAbout from "../passage-about/passage-about";
import PassageTitle from "../passage-title/passage-title";
import "./passage-item.scss";

function PassageItem({ passage }: { passage: PassageAbbr }) {
  const goToPassage = async (id: string) => {
    await navigate(`/passage/${id}`);
  };

  return (
    <span className="passage-item">
      <PassageTitle
        title={passage.title}
        onClick={async () => {
          await goToPassage(passage.identifier);
        }}
      />
      <span className="passage-item-abbreviation">
        <p className="passage-item-abbreviation-text">{passage.abbr}...</p>
      </span>
      <PassageAbout
        about={passage.about}
        onTagClick={(_, tag) => jumpToPassagePage({ tag: tag.title })}
        onCategoryClick={(_, category) => jumpToPassagePage({ category })}
      />
    </span>
  );
}

export default PassageItem;
