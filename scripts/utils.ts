import crypto from "crypto";

export const toMD5 = (arg: string): string => {
  const hash = crypto.createHash("md5");
  return hash.update(arg).digest("hex");
};
