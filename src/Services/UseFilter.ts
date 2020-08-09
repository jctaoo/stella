import { useLocation } from "react-router";
import QueryString from 'query-string';

export const useFilter = (): [string | undefined, string | undefined] => {
  const location = useLocation();

  let params = QueryString.parse(location.search);

  let tagFilter: string | undefined;
  let categoryFilter: string | undefined;

  if (typeof params['tag'] === "string") {
    tagFilter = params['tag'];
  }

  if (typeof params['category'] === "string") {
    categoryFilter = params['category'];
  }

  return [tagFilter, categoryFilter];
}