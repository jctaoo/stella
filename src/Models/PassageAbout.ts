import { PassageTag } from "./PassageTag";

export interface PassageAbout {
  updateTimes: Date[]
  tags: PassageTag[]
  readTime: number
}