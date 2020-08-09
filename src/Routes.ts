import {History} from "history"
import QueryString from "query-string";

export interface RouteItem {
  title: string,
  link: string,
  special: boolean
}

export const rootLink = "/"
export const notFoundLink = "/notfound"
export const passageLink = "/passage"

export const routeLinks: RouteItem[] = [
  {title: "blog", link: "/passage", special: false},
  {title: "about", link: "/about", special: false},
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