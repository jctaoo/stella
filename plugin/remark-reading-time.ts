import type { Plugin } from "unified";
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

// config dayjs
dayjs.extend(duration);
dayjs.extend(relativeTime)

export interface ReadingTimeStats {
  minutes: number; // rounded up minutes
  words: number; // computed words (latin words + CJK chars)
  text: string; // human text, e.g. "3 min read"
}

export const remarkReadingTime: Plugin<[]> = function () {
  return (tree, file) => {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);

    const duration = dayjs.duration(readingTime.minutes, "minutes");
    
    const stats = {
      minutes: readingTime.minutes,
      words: readingTime.words,
      text: duration.humanize(),
    }

    if (file.data?.astro?.frontmatter) {
      file.data.astro.frontmatter.readingTime = stats;
    }
  };
};

export type { ReadingTimeStats as ReadingTime };

