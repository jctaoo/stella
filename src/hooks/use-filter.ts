import QueryString from 'query-string';
import { useLocation } from "@reach/router";

export const useFilter = (): [string | undefined, string | undefined] => {
  const location = useLocation();

  let params = QueryString.parse(location.search);

  let tagFilter: string | undefined;
  let categoryFilter: string | undefined;

  if (typeof params['tag'] === "string") {
    tagFilter = params['tag'] as unknown as string;
  }

  if (typeof params['category'] === "string") {
    categoryFilter = params['category'] as unknown as string;
  }

  return [tagFilter, categoryFilter];
}
