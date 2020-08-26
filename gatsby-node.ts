import { CreatePagesArgs, CreateResolversArgs, CreateSchemaCustomizationArgs, SourceNodesArgs, CreateNodeArgs } from "gatsby";
import * as fs from "fs";
import * as path from "path";
import YAML from "yaml";
import { PassageAbbr, PassageDetail } from "./src/models/passage-content";
import crypto from "crypto";
import { MarkdownInfo } from "./src/models/markdown-info";
import { Tag } from "./src/models/base-content";
import { NodeData } from "./src/models/node-data";
import { SnippetAbbr } from "./src/models/snippet-content";
import * as UUID from "uuid";
import * as fsExtra from "fs-extra";
import axios, { AxiosResponse } from "axios";
import config from "./gatsby-config";

// TODO 链接中的图片无法点击, 无居中
// TODO 每次相同的图片生成的图片路径不一样

// 图片缓存, 避免重新复制图片/下载图片
const imageSymbolToStaticPath: Map<string, string> = new Map();

/**
 * 计算阅读时间
 * @param markdown 
 */
const calculateReadingTimeFromMarkdown = (markdown: string): number => {
  const WORDS_PER_MINUTE = 200;
  const regex=/\w+/g;
  return Math.ceil(markdown.match(regex)?.length ?? 0 / WORDS_PER_MINUTE) * 1000;
}

const toMD5 = (arg: string): string => {
  const hash = crypto.createHash("md5");
  return hash.update(arg).digest("hex");
};

const mapStringWithRegx = async (string: string, regx: RegExp, mapBlock: (result: RegExpExecArray) => Promise<string>): Promise<string> => {
  let resultString = "";
  let restString = string;
  let matchResult: RegExpExecArray | null;

  do {
    matchResult = regx.exec(restString);
    if (!!matchResult) {
      const resultLength = matchResult[0].length;
      const nextRestString = restString.slice(matchResult.index + resultLength);
      const replacedString = restString.slice(0, matchResult.index) + await mapBlock(matchResult);
      resultString += replacedString;
      restString = nextRestString;
    } else {
      resultString += restString;
    }
  } while (!!matchResult);

  return resultString;
}

const isUrl = (string: string) => {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }

  return true;
}

/**
 * 下载图片
 * @param url 图片的网络链接 
 * @param to 目标文件的绝对路径
 */
const downloadImage = async (url: string, to: string) => {
  const result: AxiosResponse<fs.ReadStream> = await axios({ url: url, responseType: "stream" });
  return new Promise((resolve, reject) => {
    result.data
      .pipe(fs.createWriteStream(to))
      .on('finish', () => resolve())
      .on('error', e => reject(e));
  });
}

/**
 * 处理图片路径，从 content 子目录下的绝对图片路径转换到基于 public 的相对路径
 * 副作用: 会复制图片到 public 子目录下
 *
 * @param imageAbsolutePath 图片绝对路径
 * @returns 基于 public 的tup路径
 */
const replaceImagePath = async (imageAbsolutePath: string): Promise<string | null> => {
  if (!!imageSymbolToStaticPath.get(imageAbsolutePath)) {
    return imageSymbolToStaticPath.get(imageAbsolutePath) ?? null;
  }
  if (fs.existsSync(imageAbsolutePath)) {
    const imageDir = path.resolve("public", "static", "images");
    if (!fs.existsSync(imageDir)) {
      await fs.promises.mkdir(imageDir, { recursive: true });
    }
    const imageName = `${UUID.v4()}.${imageAbsolutePath.split(".").reverse()[0] ?? "png"}`;
    const imagePath = path.resolve(imageDir, imageName);
    await fs.promises.copyFile(imageAbsolutePath, imagePath);
    const publicPath = imagePath.replace(path.resolve("public"), "");
    imageSymbolToStaticPath.set(imageAbsolutePath, publicPath);
    return publicPath;
  }
  return null;
}

/**
 * 规范化 markdown 字符串
 * @param markdown markdown 内容
 * @param filePath markdown 绝对路径
 * @returns 规范化的 markdown 字符串
 */
const normalizeMarkdown = async (markdown: string, filePath: string): Promise<string> => {
  const markdownImageRegx = /!\[([^\]]+)\]\(([^\)]+)\)/;
  const markdownLinkRegx = /\[(.*?)\]\((.*?)\)/;

  let resultString = markdown;

  resultString = await mapStringWithRegx(resultString, markdownImageRegx, async (match) => {
    const imageName = match[1];
    const originalPath = match[2];
    let imagePath = await replaceImagePath(path.resolve(filePath, "..", originalPath));
    if (!imagePath && !!originalPath && isUrl(originalPath)) {
      if (!!imageSymbolToStaticPath.get(originalPath)) {
        imagePath = imageSymbolToStaticPath.get(originalPath) ?? null;
      } else {
        // #TODO duplicate code from line 94
        const imageDir = path.resolve("public", "static", "images");
        if (!fs.existsSync(imageDir)) {
          await fs.promises.mkdir(imageDir, { recursive: true });
        }
        const imageName = `${UUID.v4()}.png`;
        const imageDestination = path.resolve(imageDir, imageName);
        try {
          await downloadImage(originalPath, imageDestination);
          const publicPath = imageDestination.replace(path.resolve("public"), "");
          imageSymbolToStaticPath.set(originalPath, publicPath);
          imagePath = publicPath;
        } catch (error) {
          // PASS
        }
      }
    }
    return !!imagePath ? `![${imageName}](${imagePath})` : match.input.slice(match.index, match.index + match[0].length);
  });
  resultString = await mapStringWithRegx(resultString, markdownLinkRegx, async (match: RegExpExecArray) => {
    const previousIndex = Math.max(0, match.index - 1)
    if (match.input[previousIndex] !== "!") {
      const linkName = match[1];
      const originalLink = match[2];
      const linkPath = path.resolve(filePath, "..", originalLink);
      // TODO 不要重复读取文件
      if (fs.existsSync(linkPath)) {
        const content = (await fs.promises.readFile(linkPath)).toString();
        const idntifierMatch = /identifier:\s(.*)/.exec(content);
        const titleMatch = /title:\S(.*)/.exec(content);
        const identifier = !!idntifierMatch ? idntifierMatch[1] : (!!titleMatch ? toMD5(titleMatch[1]) : linkPath);
        return `[${linkName}](/passage/${identifier})`;
      }
      return match.input.slice(match.index, match.index + match[0].length)
    } else {
      return match.input.slice(match.index, match.index + match[0].length)
    }
  });

  return resultString;
}

const clearImages = () => {
  const imagePath = path.resolve("public", "static", "images");
  if (fs.existsSync(imagePath)) {
    fsExtra.removeSync(imagePath); 
  }
}

// TODO discus 拼错了 ---> disqus
// TODO 将 markdown 翻译 html 在 准备阶段执行

export const createResolvers = async (args: CreateResolversArgs) => {
  // TODO 基于 Gatsby Node 构建
  const resolvers = {
    Query: {
      about: {
        type: ['ContentDetail'],
        resolve: (source: any, args: any, context: any, info: any) => {
          return null
        }
      },
    }
  }
  args.createResolvers(resolvers)
}

export const createSchemaCustomization = async (args: CreateSchemaCustomizationArgs) => {
  const { createTypes } = args.actions;
  const typeDefs = `
    type ContentDetail {
      item: ContentAbbr!
      content: String!
      topImage: String
      circleImage: String
    }
    type ContentAbbr {
      identifier: String!
      title: String!
      abbr: String
      about: About!
      codeRaw: String
    }
    type About {
      updateTimes: [Date!]!
      tags: [Tag!]!
      category: String
      readTime: Int
    }
  `;
  createTypes(typeDefs);
}

export const sourceNodes = async (args: SourceNodesArgs) => {
  clearImages();

  const yamlRegx = /^---\n([\s\S]*?)---\n{0,1}/;
  const codeSnippetRegx = /```.*?\n[\s\S]*?```\n{0,1}/;

  // 添加 siteMetadata 节点
  const siteMetadata: any | undefined = config.siteMetadata;
  args.actions.createNode({
    config: {
      siteName: siteMetadata?.config?.siteName ?? siteMetadata?.title ?? "",
      homeLargeTitle: siteMetadata?.config?.homeLargeTitle ?? "",
      discus: {
        shortName: siteMetadata?.config?.discus?.shortName ?? ""
      },
    },
    routeConfigurations: {
      about: { title: siteMetadata?.routeConfigurations?.about?.title ?? "" },
      passages: { title: siteMetadata?.routeConfigurations?.passages?.title ?? "" },
      snippets: { title: siteMetadata?.routeConfigurations?.snippets?.title ?? "" },
    },
    medias: (!!siteMetadata?.medias && Array.isArray(siteMetadata?.medias)) ? (siteMetadata.medias as any[]).map(t => ({
      identifier: t.identifier ?? "",
      iconName: t.iconName ?? "",
      title: t.title ?? "",
      link: t.link ?? "",
      imageName: t.imageName ?? "",
    })) : [],
    id: args.createNodeId("SiteMetadata"),
    internal: {
      type: "SiteMetadata",
      contentDigest: args.createContentDigest(siteMetadata)
    }
  });

  // read posts
  const baseDir = path.resolve(__dirname, "content", "posts")
  const dir = await fs.promises.readdir(baseDir);

  const abbrs: PassageAbbr[] = [];
  const details: PassageDetail[] = [];
  let tags: Tag[] = [];
  let categories: string[] = [];

  for (const name of dir) {
    const stat = await fs.promises.stat(path.resolve(baseDir, name));

    if (!stat.isFile() || name.split(".").reverse().indexOf("md") !== 0) {
      continue
    }

    const item = await fs.promises.readFile(path.resolve(baseDir, name));

    let content = item.toString();
    content = await normalizeMarkdown(content, path.resolve(baseDir, name));

    const matchResult = content.match(yamlRegx);
    if (matchResult) {
      const yaml: MarkdownInfo = YAML.parse(matchResult[1]);
      const markdown = content.slice((matchResult.index ?? 0) + matchResult[0].length);
      let abbr = yaml.abbr;
      let markdownContent = markdown;
      let identifier = yaml.identifier ?? toMD5(yaml.title);
      const passageAbbr: PassageAbbr = {
        identifier: identifier,
        title: yaml.title,
        abbr: abbr,
        about: {
          updateTimes: yaml.updateDates.map(d => new Date(d)),
          tags: yaml.tags.map(t => ({ id: toMD5(t), title: t })),
          category: yaml.category,
          readTime: calculateReadingTimeFromMarkdown(markdownContent),
        }
      }
      // TODO 完善空字段处理 https://github.com/gatsbyjs/gatsby/issues/6800
      const passageDetail: PassageDetail = {
        item: passageAbbr,
        content: markdownContent,
        topImage: yaml.topImage ?? "",
        circleImage: yaml.circleImage ?? "",
      }
      abbrs.push(passageAbbr);
      details.push(passageDetail);
      tags = tags.concat(passageAbbr.about.tags);
      if (passageAbbr.about.category) {
        categories.push(passageAbbr.about.category);
      }
    }
  }

  tags = Array.from(new Set(tags));
  categories = Array.from(new Set(categories));
  abbrs.sort((lhs, rhs) => {
    return rhs.about.updateTimes[0].getTime() - lhs.about.updateTimes[0].getTime()
  });

  tags.forEach(tag => {
    args.actions.createNode({
      ...tag,
      id: args.createNodeId(tag.id),
      internal: {
        type: 'Tag',
        contentDigest: args.createContentDigest(tag)
      }
    });
  });
  categories.forEach(category => {
    args.actions.createNode({
      id: args.createNodeId(category),
      internal: {
        type: 'Category',
        contentDigest: args.createContentDigest(category),
        content: category,
      }
    });
  })
  abbrs.forEach(abbr => {
    args.actions.createNode({
      ...abbr,
      id: args.createNodeId(abbr.identifier + "passage"),
      internal: {
        type: 'Passage',
        contentDigest: args.createContentDigest(abbr),
      }
    });
  });
  details.forEach(detail => {
    args.actions.createNode({
      ...detail,
      id: args.createNodeId(detail.item.identifier + "detail"),
      internal: {
        type: 'PassageDetail',
        contentDigest: args.createContentDigest(detail),
      }
    });
  });

  // read snippets
  const snippetsDirName = path.resolve(__dirname, "content", "snippets")
  const snippetsDir = await fs.promises.readdir(snippetsDirName);

  const snippets: SnippetAbbr[] = [];

  for (const item of snippetsDir) {
    const stat = await fs.promises.stat(path.resolve(snippetsDirName, item));

    if (!stat.isFile() || item.split(".").reverse().indexOf("md") !== 0) {
      continue;
    }

    let content = (await fs.promises.readFile(path.resolve(snippetsDirName, item))).toString();
    content = await normalizeMarkdown(content, path.resolve(snippetsDirName, item));

    const matchResult = content.match(yamlRegx);
    const codeMatchResult = content.match(codeSnippetRegx);

    if (matchResult && codeMatchResult) {
      const yaml: MarkdownInfo = YAML.parse(matchResult[1]);
      const codeSnippet = codeMatchResult[0];
      const abbr = content.slice((codeMatchResult.index ?? 0) + codeMatchResult[0].length);

      let identifier = yaml.identifier ?? toMD5(yaml.title);
      // # TODO 实现多 updateTimes
      const snippet: SnippetAbbr = {
        identifier: identifier,
        title: yaml.title,
        abbr: abbr,
        codeRaw: codeSnippet,
        about: {
          updateTimes: yaml.updateDates.map(d => new Date(d)),
          tags: yaml.tags.map(t => ({ id: toMD5(t), title: t })),
          category: yaml.category,
        }
      }
      snippets.push(snippet);
    }
  }

  snippets.sort((lhs, rhs) => {
    return rhs.about.updateTimes[0].getTime() - lhs.about.updateTimes[0].getTime()
  });

  snippets.forEach(snippet => {
    args.actions.createNode({
      ...snippet,
      id: args.createNodeId(snippet.identifier + "snippet"),
      internal: {
        type: 'Snippet',
        contentDigest: args.createContentDigest(snippet),
      }
    });
  });

}

interface CreatePagesData {
  allPassage: NodeData<PassageAbbr>
}

export const createPages = async (args: CreatePagesArgs) => {
  const result = await args.graphql<CreatePagesData>(`
    {
      allPassage {
        edges {
          node {
            identifier
          }
        }
      }
    }
  `)
  result.data?.allPassage.edges.forEach(item => {
    args.actions.createPage({
      path: `/passage/${item.node.identifier}`,
      component: path.resolve(__dirname, 'src', 'templates', 'passage', 'passage.tsx'),
      context: {
        identifier: item.node.identifier,
      }
    });
  });
}


