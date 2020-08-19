import { BaseContentAbbr, BaseContentDetail } from "./BaseContent";
import demoCodeSnippet from "../Resources/Text/DemoCodeSnippet";

export interface SnippetAbbr extends BaseContentAbbr {
  codeRaw?: string
}

export interface SnippetDetail extends BaseContentDetail {

}

export const demoSnippetsAbbrs: SnippetAbbr[] = [
  {
    identifier: "#0",
    title: "自定义Button无法点击",
    abbr: "在自定义按钮上加了其它View\n解决方案: 设置其它View的isUserInteractionEnabled为false",
    codeRaw: demoCodeSnippet,
    about: {
      updateTimes: [new Date()],
      tags: [
        {id:"1", title:"Math"},
        {id:"12", title:"Python"}
      ],
      readTime: 1000 * 10 * 60,
      category: "UIKit"
    }
  },
  {
    identifier: "#1",
    title: "Enlace Started",
    codeRaw: demoCodeSnippet,
    about: {
      updateTimes: [new Date()],
      tags: [
        {id:"1", title:"Math"},
        {id:"12", title:"Python"}
      ],
      readTime: 1000 * 10 * 60,
      category: "Enlace"
    }
  },
]