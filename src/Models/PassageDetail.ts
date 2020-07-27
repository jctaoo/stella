import PassageItem, { demoPassage1 } from "./PassageAbbr";
import DemoText from "../Resources/Text/DemoText";

export default interface PassageDetail {

  item: PassageItem

  markdownRaw: string
}

export const demoPassageDetail: PassageDetail = {
  item: demoPassage1,
  markdownRaw: DemoText,
}