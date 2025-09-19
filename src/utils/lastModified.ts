import type { CollectionEntry, CollectionKey } from "astro:content";
import type { GitTime } from "@plugins/remark-modified-time";
import dayjs from "dayjs";

export function formatLastModified(gitTimes: GitTime) {
  return dayjs(gitTimes.updatedAt).format("YYYY/MM/DD HH:mm");
}

export function getLastModified<C extends CollectionKey>(post: CollectionEntry<C>) {
  // @ts-expect-error
  const gitTimes = post.rendered.metadata.frontmatter.gitTimes as GitTime;
  return formatLastModified(gitTimes);
}

export function getLastModifiedDate<C extends CollectionKey>(post: CollectionEntry<C>) {
  // @ts-expect-error
  const gitTimes = post.rendered.metadata.frontmatter.gitTimes as GitTime;
  return dayjs(gitTimes.updatedAt);
}