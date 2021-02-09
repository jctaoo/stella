/**
 * @description 文章以及 snippets 等的过滤的逻辑
 */

import QueryString from "querystring";
import { graphql, navigate, useStaticQuery } from "gatsby";
import { useLocation } from "@reach/router";
import { Tag } from "../models/base-content";
import {
  getContentFromNodeContentData,
  getNodesFromNodeData,
  NodeContentData,
  NodeData,
} from "../models/node-data";

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
  await navigate(`/passages?${search}`, { replace: true });
}

export async function cancelTagFilter({
  category,
}: {
  category?: string;
  tag?: string;
}) {
  const search = QueryString.stringify({ category });
  await navigate(`/passages?${search}`, { replace: true });
}

// https://www.gatsbyjs.com/blog/2019-02-20-introducing-use-static-query/
// TODO Its a limitation in gatsby that can only use one instance of useStaticQuery in a file.
function useTagsAndCategories(): {
  allTag: NodeData<Tag>;
  allCategory: NodeContentData<string>;
} {
  return useStaticQuery<{
    allTag: NodeData<Tag>;
    allCategory: NodeContentData<string>;
  }>(graphql`
    {
      allCategory {
        edges {
          node {
            internal {
              content
            }
          }
        }
      }
      allTag {
        edges {
          node {
            title
          }
        }
      }
    }
  `);
}

export function useCategories(): string[] {
  const res = useTagsAndCategories();
  return getContentFromNodeContentData(res.allCategory);
}

export function useTags(): Tag[] {
  const res = useTagsAndCategories();
  return getNodesFromNodeData(res.allTag);
}

/**
 * @return {[string | undefined, string | undefined]} first is tagFilter and second is categoryFilter
 */
export function useFilter(): [string | undefined, string | undefined] {
  const location = useLocation();

  let params = QueryString.parse(location.search);

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
