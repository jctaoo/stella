import crypto from "crypto";
import { promises } from "fs";
import { join, resolve } from "path";

const { readFile } = promises;

export const toMD5 = (arg: string): string => {
  const hash = crypto.createHash("md5");
  return hash.update(arg).digest("hex");
};

export const localGql = async (path: string): Promise<string> => {
  const target = resolve(join(process.cwd(), path));
  const content = await readFile(target);
  return content.toString();
}