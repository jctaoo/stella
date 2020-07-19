interface RouteItem {
  title: string,
  link: string,
  special: boolean
}

export const rootLink = "/"
export const notFoundLink = "/notfound"
export const routeLinks: RouteItem[] = [
  {title:"blog", link:"/passage", special: false},
  {title:"resume", link:"/resume", special: false},
  {title:"projects", link:"/projects", special: false},
  {title:"Enlace", link:"/enlace", special: true},
];
