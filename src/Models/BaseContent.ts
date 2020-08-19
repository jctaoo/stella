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

export interface BaseContentDetail {
  item: BaseContentAbbr
  markdownRaw: string
  topImage?: string
  circleImage?: string
}

export enum ContentDetailState {
  loading,
  notfound,
  fail,
}

export function isContentDetailState(obj: unknown): boolean {
  const keys = Object.keys(ContentDetailState);
  for (const key of keys) {
    if (obj === key) {
      return true;
    }
  }
  return false;
}
