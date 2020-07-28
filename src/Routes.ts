interface RouteItem {
  title: string,
  link: string,
  special: boolean
}

export const rootLink = "/"
export const notFoundLink = "/notfound"

export const routeLinks: RouteItem[] = [
  {title:"blog", link:"/passage", special: false},
  {title:"about", link:"/about", special: false},
  {title:"projects", link:"/projects", special: false},
  {title:"Enlace", link:"/enlace", special: true},
];
export function getRouteItemOfPath(path: string): RouteItem | undefined {
  return routeLinks.filter((e) => e.link === path)[0]
}