import { Node } from "gatsby";

import { ImageData } from "../src/models/base-content";

export interface RemarkNode extends Node {
  excerpt: string;
  fileAbsolutePath: string;
  html: string;
  rawMarkdownBody: string;
  tableOfContents: string;
  timeToRead: number;
  frontmatter: Partial<{
    abbr: string;
    category: string;
    identifier: string;
    tags: string[];
    title: string;
    topImageAlt: string;
    updateDates: string[];
    topImage: {
      childImageSharp: {
        gatsbyImageData: ImageData;
      };
    };
    circleImage: {
      absolutePath: string;
      publicURL: string;
    };
  }>;
  wordCount: {
    paragraphs: number;
    words: number;
    sentences: number;
  };
  headings: {
    depth: number;
    value: string;
  }[];
}
