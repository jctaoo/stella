import _ from "lodash";

export function isLooseEqual(a?: string, b?: string) {
  const normalize = _.flow([_.trim, _.toLower, (str: string) => _.replace(str, /[\s\-]/g, "")]);
  return normalize(a) === normalize(b);
}
