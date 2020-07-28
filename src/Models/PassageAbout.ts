import { PassageTag } from "./PassageTag";

export interface PassageAbout {
  updateTimes: Date[]
  tags: PassageTag[]
  category?: string
  readTime: number
}