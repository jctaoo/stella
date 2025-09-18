/**
 * @description 文章以及 snippets 等的过滤的逻辑
 */

import { useLocation } from "@reach/router";
import { graphql, navigate, useStaticQuery } from "gatsby";
import QueryString from "query-string";

import { Tag } from "../models/base-content";
import {
  getContentFromNodeContentData,
  getNodesFromNodeData,
  NodeContentData,
  NodeData,
} from "../models/node-data";

export enum ListEnvironment {
  passages = "passages",
  snippets = "snippets",
}

export async function jumpToPassagePage(filter: {
  category?: string;
  tag?: string;
}) {
  const query = QueryString.stringify(filter);
  await navigate(`/passages?${query}`, { replace: true });
}

export async function jumpToSnippetsPage(filter: {
  category?: string;
  tag?: string;
}) {
  const query = QueryString.stringify(filter);
  await navigate(`/snippets?${query}`, { replace: true });
}

export async function cancelCategoryFilter({
  tag,
}: {
  category?: string;
  tag?: string;
}) {
  const search = QueryString.stringify({ tag });
  await navigate(`?${search}`, { replace: true });
}

export async function cancelTagFilter({
  category,
}: {
  category?: string;
  tag?: string;
}) {
  const search = QueryString.stringify({ category });
  await navigate(`?${search}`, { replace: true });
}

// https://www.gatsbyjs.com/blog/2019-02-20-introducing-use-static-query/
function useTagsAndCategories(): {
  allPostTag: NodeData<Tag>;
  allSnippetTag: NodeData<Tag>;
  allPostCategory: NodeContentData<string>;
  allSnippetCategory: NodeContentData<string>;
} {
  return useStaticQuery<{
    allPostTag: NodeData<Tag>;
    allSnippetTag: NodeData<Tag>;
    allPostCategory: NodeContentData<string>;
    allSnippetCategory: NodeContentData<string>;
  }>(graphql`
    {
      allPostCategory {
        edges {
          node {
            internal {
              content
            }
          }
        }
      }
      allSnippetCategory {
        edges {
          node {
            internal {
              content
            }
          }
        }
      }
      allPostTag {
        edges {
          node {
            title
          }
        }
      }
      allSnippetTag {
        edges {
          node {
            title
          }
        }
      }
    }
  `);
}

/**
 * @param env if env is null, useTags will return all categories.
 */
export function useCategories(env?: ListEnvironment): string[] {
  const res = useTagsAndCategories();
  const postCategories = getContentFromNodeContentData(res.allPostCategory);
  const snippetCategories = getContentFromNodeContentData(
    res.allSnippetCategory
  );
  if (env) {
    switch (env) {
      case ListEnvironment.passages:
        return postCategories;
      case ListEnvironment.snippets:
        return snippetCategories;
    }
  }
  return [...postCategories, ...snippetCategories];
}

/**
 * @param env if env is null, useTags will return all tags.
 */
export function useTags(env?: ListEnvironment): Tag[] {
  const res = useTagsAndCategories();
  const postTags = getNodesFromNodeData(res.allPostTag);
  const snippetTags = getNodesFromNodeData(res.allSnippetTag);
  if (env) {
    switch (env) {
      case ListEnvironment.passages:
        return postTags;
      case ListEnvironment.snippets:
        return snippetTags;
    }
  }
  return [...postTags, ...snippetTags];
}

/**
 * @return first is tagFilter and second is categoryFilter
 */
export function useFilter(): [string | undefined, string | undefined] {
  const location = useLocation();

  const params = QueryString.parse(location.search);

  let tagFilter: string | undefined;
  let categoryFilter: string | undefined;

  if (typeof params["tag"] === "string") {
    tagFilter = (params["tag"] as unknown) as string;
  }

  if (typeof params["category"] === "string") {
    categoryFilter = (params["category"] as unknown) as string;
  }

  return [tagFilter, categoryFilter];
}
