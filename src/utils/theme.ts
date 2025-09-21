export type Theme = "light" | "dark";

export function getNormalizedTheme(): Theme {
  const localStorageTheme = localStorage?.getItem("theme") ?? "";
  if (["dark", "light"].includes(localStorageTheme)) {
    return localStorageTheme as Theme;
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}
