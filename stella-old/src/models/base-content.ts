import { IGatsbyImageData } from "gatsby-plugin-image";

export interface BaseContentAbbr {
  identifier: string;
  title: string;
  abbr?: string;
  about: About;
}

export interface About {
  updateTimes: string[];
  tags: Tag[];
  category?: string;
  readTime?: number;
}

export interface Tag {
  id: string;
  title: string;
}

export type ImageData = IGatsbyImageData

export interface BaseContentDetail<
  Abbr extends BaseContentAbbr = BaseContentAbbr
> {
  item: Abbr;
  content: string;
  topImage?: ImageData;
  topImageAlt?: string;
  circleImage?: string;
}
