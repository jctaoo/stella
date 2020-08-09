import {History} from "history"
import QueryString from "query-string";

export interface RouteItem {
  title: string,
  link: string,
  special: boolean
}

export const rootLink = "/"
export const notFoundLink = "/not-found"
export const passageLink = "/passage"
export const aboutLink = "/about"
export const codeSnippetLink = "/code-snippet"

export const routeLinks: RouteItem[] = [
  {title: "blog", link: passageLink, special: false},
  {title: "snippet", link: codeSnippetLink, special: false},
  {title: "about", link: aboutLink, special: false},
];

export function getRouteItemOfPath(path: string): RouteItem | undefined {
  return routeLinks.filter((e) => e.link === path)[0]
}

export function routeToPassageListWithFilter(history: History, { tag, category }: { tag?: string, category?: string }) {
  history.push({
    pathname: passageLink,
    search: QueryString.stringify({
      tag,
      category,
    })
  });
}