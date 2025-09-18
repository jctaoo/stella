export function openLink(href: string) {
  if (!href.match(/^.+?:\/\//i)) {
    href = `https://${href}`;
  }
  window.open(href, "_blank", "noopener=yes,noreferrer=yes");
}
