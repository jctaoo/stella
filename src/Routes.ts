interface RouteItem {
  title: string,
  link: string,
  special: boolean
}

export const rootLink = "/"
export const notFoundLink = "/notfound"
export const passageLink = "/passage"
export const categoryBaseLink = "/passage/category/"
export const tagBaseLink = "/passage/tag/"

export const routeLinks: RouteItem[] = [
  {title:"blog", link:"/passage", special: false},
  {title:"about", link:"/about", special: false},
  {title:"tags", link:"/tags", special: false},
  {title:"categories", link:"/categories", special: false},
];
export function getRouteItemOfPath(path: string): RouteItem | undefined {
  return routeLinks.filter((e) => e.link === path)[0]
}