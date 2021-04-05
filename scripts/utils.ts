import crypto from "crypto";
import * as fs from "fs";

import axios, { AxiosResponse } from "axios";

/**
 * 计算阅读时间
 * @param markdown
 */
export const calculateReadingTimeFromMarkdown = (markdown: string): number => {
  const WORDS_PER_MINUTE = 200;
  const regex = /\w+/g;
  return (
    Math.ceil(markdown.match(regex)?.length ?? 0 / WORDS_PER_MINUTE) * 1000
  );
};

export const toMD5 = (arg: string): string => {
  const hash = crypto.createHash("md5");
  return hash.update(arg).digest("hex");
};

/**
 * 下载图片
 * @param url 图片的网络链接
 * @param to 目标文件的绝对路径
 */
export const downloadImage = async (url: string, to: string) => {
  const result: AxiosResponse<fs.ReadStream> = await axios({
    url: url,
    responseType: "stream",
  });
  return new Promise<void>((resolve, reject) => {
    result.data
      .pipe(fs.createWriteStream(to))
      .on("finish", () => resolve())
      .on("error", (e) => reject(e));
  });
};

export const isUrl = (string: string) => {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
};

export const ensureFolder = async (path: string) => {
  if (!fs.existsSync(path)) {
    await fs.promises.mkdir(path, { recursive: true });
  }
};


type ReplaceAsyncReplacer = (
  substring: string,
  // std lib types use any also
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => Promise<string>;

export async function replaceAsync(
  originalStr: string,
  searchValue: RegExp | string,
  replacer: ReplaceAsyncReplacer
): Promise<string> {
  const promises: Promise<string>[] = [];
  // std lib types use any also
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originalStr.replace(searchValue, (match: string, ...args: any[]): string => {
    const promise = replacer(match, ...args);
    promises.push(promise);
    return "";
  });
  const results = await Promise.all(promises);

  // results.shift never return undefined because results 
  // were built by the originalStr and searchValue and until 
  // now the originalStr hasn't been modified. So the length 
  // of results always just right.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return originalStr.replace(searchValue, () => results.shift()!);
}
