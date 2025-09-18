import { CreativeCommons } from "../src/models/creative-commons";
import { SiteMetadata } from "../src/models/site-metadata";

export function checkCreateComments(
  siteMetadata: SiteMetadata,
  panic: (msg: string, err: Error) => void
) {
  if (
    !!siteMetadata.copyright?.creativeCommons &&
    !Object.keys(CreativeCommons).includes(
      siteMetadata.copyright.creativeCommons
    )
  ) {
    panic(
      `
错误的 CreateCommons 值, 您可能需要如下的值:
${Object.keys(CreativeCommons)
  .map(
    (key) =>
      `\t${key} (代表 ${
        CreativeCommons[key as keyof typeof CreativeCommons]
      } 协议)`
  )
  .join("\n")}
如果您不想使用 CreativeCommons, 请去掉 creativeCommons 字段
您可以跳转到 CreativeCommons 的网站 https://creativecommons.org/
或者使用 CreativeCommons 官方的方式来选择适合您的协议 https://creativecommons.org/choose/
      `,
      new Error("Bad `createCommons` value")
    );
  }
}
