import React from "react"
import "./PassagePage.scss"
import { useRouteMatch } from "react-router";
import PassageTitleView from "../../Views/PassageTitleView/PassageTitleView";
import PassageAboutView from "../../Views/PassageAboutView/PassageAboutView";
import { PassageTag } from "../../Models/PassageItem";
import { mdHtml } from "../../Resources/Text/html";

interface PassagePageRouteParams {
  id: string
}

function PassagePage() {
  const passageId = useRouteMatch().params as PassagePageRouteParams

  return (
    <div id="passage-page">
      <div className="passage-container">
        <div className="passage-title-container">
          <PassageTitleView title={"卷积和快速傅里叶变换（FFT）的实现"}/>
          <PassageAboutView updateTimes={[new Date()]} tags={[new PassageTag("1", "Test")]} readTime={1000*60*10}/>
        </div>
        <div className="passage-content-container" dangerouslySetInnerHTML={{__html: mdHtml}}/>
      </div>
    </div>
  )
}

export default PassagePage