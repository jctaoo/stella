import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export { wrapRootElement } from "./src/gatsby-container";
