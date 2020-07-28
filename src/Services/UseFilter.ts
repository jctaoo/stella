import { useLocation } from "react-router";
import { categoryBaseLink, tagBaseLink } from "../Routes";

export const useFilter = (): [string | undefined, string | undefined] => {
  const location = useLocation();
  let tagFilter: string | undefined;
  let categoryFilter: string | undefined;

  const splits = location.pathname.split('/');
  const lastComponent = splits[splits.length - 1];

  if (location.pathname.startsWith(tagBaseLink)) {
    tagFilter = lastComponent === '' ? undefined : lastComponent;
  }

  if (location.pathname.startsWith(categoryBaseLink)) {
    categoryFilter = lastComponent === '' ? undefined : lastComponent;
  }

  return [tagFilter, categoryFilter];
}