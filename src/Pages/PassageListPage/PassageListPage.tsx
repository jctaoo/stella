import React from "react";
import "./PassageListPage.scoped.scss"
import PassageItemView from "../../Views/PassageItemView/PassageItemView";
import {
  demoPassage1,
  demoPassage2,
  demoPassage3,
  demoPassage4,
  demoPassage5,
  demoPassage6
} from "../../Models/PassageItem";
import QueueAnim from 'rc-queue-anim';

function PassageListPage() {
  return (
    <div id="passage-list-page">
      <QueueAnim delay={150} duration={300} animConfig={[
          { opacity: [1, 0], translateY: [0, 150] },
          { opacity: [1, 0], translateY: [0, -50] }
        ]}>
        <div id="passage-list" key="passage-list">
          <PassageItemView passage={demoPassage1}/>
          <PassageItemView passage={demoPassage2}/>
          <PassageItemView passage={demoPassage3}/>
          <PassageItemView passage={demoPassage4}/>
          <PassageItemView passage={demoPassage5}/>
          <PassageItemView passage={demoPassage6}/>
        </div>
      </QueueAnim>
    </div>
  )
}

export default PassageListPage