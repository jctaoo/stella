import React, { useEffect, useRef } from "react"
import marked from "marked"
import Highlight from "highlight.js";
import "./PassagePage.scss"
import { useRouteMatch } from "react-router";
import PassageTitleView from "../../Views/PassageTitleView/PassageTitleView";
import PassageAboutView from "../../Views/PassageAboutView/PassageAboutView";
import { PassageTag } from "../../Models/PassageItem";
import demoMarkdown from "../../Resources/Text/DemoText"
import BasePage from "../BasePage";

interface PassagePageRouteParams {
  id: string
}

function PassagePage() {
  const passageId = (useRouteMatch().params as PassagePageRouteParams).id
  console.log(passageId)
  let html = marked(demoMarkdown);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef) {
      // 处理高亮
      const elements = contentRef.current?.querySelectorAll("pre");
      if (elements) {
        const nodes = Array.from(elements);
        nodes.forEach((node) => {
          Highlight.highlightBlock(node as HTMLElement)
        })
      }
    }
  })

  return (
    <BasePage id="passage-page">
      <div className="passage-container">
        <div className="passage-title-container">
          <PassageTitleView title={"卷积和快速傅里叶变换（FFT）的实现"}/>
          <PassageAboutView updateTimes={[new Date()]} tags={[new PassageTag("1", "Test")]} readTime={1000*60*10}/>
        </div>
        <div ref={contentRef} className="passage-content-container" dangerouslySetInnerHTML={{__html: html}}/>
      </div>
    </BasePage>
  )
}

export default PassagePage