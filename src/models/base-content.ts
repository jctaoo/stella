export interface BaseContentAbbr {
  identifier: string
  title: string
  abbr?: string
  about: About
}

export interface About {
  updateTimes: Date[]
  tags: Tag[]
  category?: string
  readTime?: number
}

export interface Tag {
  id: string
  title: string
}

export interface BaseContentDetail<Abbr extends BaseContentAbbr = BaseContentAbbr> {
  item: Abbr
  content: string
  topImage?: string
  circleImage?: string
}

