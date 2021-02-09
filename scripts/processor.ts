import { MarkdownInfo } from "../src/models/markdown-info";
import * as Utils from "./utils";
import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";
import * as UUID from "uuid";
import YAML from "yaml";
import { PassageAbbr, PassageDetail } from "../src/models/passage-content";
import {
  BaseContentAbbr,
  BaseContentDetail,
  Tag,
} from "../src/models/base-content";
import { SnippetAbbr, SnippetDetail } from "../src/models/snippet-content";
import configureMarked from "./marked-configuration";
import marked from "marked";
import { DownloadManager } from "./download-manager";

interface MarkdownProcessResult {
  information: MarkdownInfo;
  markdown: string;
  abbr: BaseContentAbbr;
  detail: BaseContentDetail;
}

interface PostsProcessResult {
  tags: Tag[];
  categories: string[];
  details: PassageDetail[];
  abbrs: PassageAbbr[];
}

interface SnippetsProcessResult {
  tags: Tag[];
  categories: string[];
  details: SnippetDetail[];
}

interface ExperimentFeature {
  downloadWebPicture: {
    enable: Boolean;
    excludeUrlRegx: string[];
  };
}

export default class Processor {
  constructor(
    {
      publicDir,
      imageStaticDir,
      postsDir,
      snippetsDir,
      aboutDir,
    }: {
      publicDir: string;
      imageStaticDir: string;
      postsDir: string;
      snippetsDir: string;
      aboutDir: string;
    },
    experimentFeatures: ExperimentFeature
  ) {
    this.publicDir = publicDir;
    this.imageStaticDir = imageStaticDir;
    this.postsDir = postsDir;
    this.snippetsDir = snippetsDir;
    this.aboutDir = aboutDir;
    this.experimentFeatures = experimentFeatures;
    configureMarked();
  }

  // ==================== Properties ====================

  private readonly experimentFeatures: ExperimentFeature;

  private readonly publicDir: string;
  private readonly imageStaticDir: string;
  private readonly postsDir: string;
  private readonly snippetsDir: string;
  private readonly aboutDir: string;

  private readonly markdownImageRegx = /!\[([^\]]+)]\(([^)]+)\)/g;
  private readonly markdownLinkRegx = /\[(.*?)]\((.*?)\)/g;
  private readonly markdownYamlRegx = /^---\n([\s\S]*?)---\n?/;
  private readonly codeSnippetRegx = /```.*?\n([\s\S]*?)```\n?/;

  /** 图片缓存, 避免重新复制图片/下载图片 */
  private imageSymbolToTargetPath: Map<string, string> = new Map();
  private readonly downloadManager = new DownloadManager();

  // ==================== 处理流程 ====================

  public async processAbout(): Promise<PassageDetail | undefined> {
    const result = await this.processMarkdown(this.aboutDir);
    return result?.detail;
  }

  public async processPosts(): Promise<PostsProcessResult> {
    const children = await fs.promises.readdir(this.postsDir);

    let tags: Tag[] = [];
    let categories: string[] = [];
    let abbrs: PassageAbbr[] = [];
    let details: PassageDetail[] = [];

    for (const childPath of children) {
      const result = await this.processMarkdown(
        path.resolve(this.postsDir, childPath)
      );
      if (!!result) {
        tags = tags.concat(result.abbr.about.tags ?? []);
        categories.push(result.abbr.about.category ?? "");
        abbrs.push(result.abbr);
        details.push(result.detail);
      }
    }

    abbrs.sort((lhs, rhs) => {
      return (
        rhs.about.updateTimes[0].getTime() - lhs.about.updateTimes[0].getTime()
      );
    });

    return {
      tags: Array.from(new Set(tags)),
      categories: Array.from(new Set(categories)).filter((c) => c !== ""),
      abbrs,
      details,
    };
  }

  public async processSnippets(): Promise<SnippetsProcessResult> {
    const children = await fs.promises.readdir(this.snippetsDir);

    let tags: Tag[] = [];
    let categories: string[] = [];
    let details: SnippetDetail[] = [];

    for (const childPath of children) {
      const result = await this.processMarkdown(
        path.resolve(this.snippetsDir, childPath)
      );
      if (!!result) {
        // details
        const codeMatchResult = result.markdown.match(this.codeSnippetRegx);
        const codeRaw = !!codeMatchResult
          ? marked(codeMatchResult[0])
          : undefined;
        const abbr = !!codeMatchResult
          ? result.markdown.slice(
              (codeMatchResult.index ?? 0) + codeMatchResult[0].length
            )
          : result.markdown;
        const detail: SnippetDetail = {
          content: (`<p>${abbr}</p>` ?? "") + "\n" + (codeRaw ?? ""),
          item: { ...result.abbr, abbr, codeRaw },
          topImage: undefined,
          circleImage: undefined,
        };
        details.push(detail);
        // tags & categories
        tags = tags.concat(result.abbr.about.tags ?? []);
        categories.push(result.abbr.about.category ?? "");
      }
    }

    details.sort((lhs, rhs) => {
      return (
        rhs.item.about.updateTimes[0].getTime() -
        lhs.item.about.updateTimes[0].getTime()
      );
    });

    return {
      tags: Array.from(new Set(tags)),
      categories: Array.from(new Set(categories)).filter((c) => c !== ""),
      details: details,
    };
  }

  // ==================== 预处理流程 ====================

  /**
   * 清理 public 中的图片资源文件夹
   */
  public async clearAndEnsureImageFolder() {
    await Utils.ensureFolder(this.imageStaticDir);
    if (fs.existsSync(this.imageStaticDir)) {
      fsExtra.removeSync(this.imageStaticDir);
    }
    await Utils.ensureFolder(this.imageStaticDir);
  }

  // ==================== 规范化流程 ====================

  /**
   * 规范化文件的唯一 id
   * @param fileAbsolutePath 文件的绝对路径
   * @param userIdentifier 用户填写的 id
   * @param userTitle 用户填写的文件标题
   *
   * Conditions:
   * - has identifier defined by passage author: using identifier.
   * - hasn't user identifier but has passage title: using md5(title).
   * - Neither user identifier nor passage title: using file name.
   */
  private static normalizeIdentifier(
    fileAbsolutePath: string,
    userIdentifier?: string,
    userTitle?: string
  ): string {
    const extension = fileAbsolutePath.split(".").reverse()[0];
    const name = path.basename(fileAbsolutePath, extension);
    return userIdentifier ?? (!!userTitle ? Utils.toMD5(userTitle) : name);
  }

  /**
   * 规范化图片链接
   * @param link 原图片链接
   * @param filePath 原文件的绝对路径
   */
  private async normalizeImageLink(
    link: string,
    filePath: string
  ): Promise<string> {
    if (link === "") return link;

    // 读取缓存的链接
    const cache = this.imageSymbolToTargetPath.get(link);
    console.log("get cache", link, cache);
    if (!!cache) {
      return cache;
    }

    const cacheLink = (targetPath: string = link) => {
      console.log("cache", link, targetPath);
      this.imageSymbolToTargetPath.set(link, targetPath);
    };

    // 如果是 web url, 下载图片
    if (
      this.experimentFeatures.downloadWebPicture.enable &&
      Utils.isUrl(link)
    ) {
      // check if is be exclude
      let included = true;
      for (const regx of this.experimentFeatures.downloadWebPicture
        .excludeUrlRegx) {
        included = !new RegExp(regx).test(link);
        if (!included) break;
      }
      console.log("1downloading......", link, included);
      // download image
      if (included) {
        console.log("downloading......", link);
        return await this.downloadManager.startTask(link, async (link) => {
          const imageName = `${UUID.v4()}.png`;
          const imageDestination = path.resolve(this.imageStaticDir, imageName);
          try {
            await Utils.downloadImage(link, imageDestination);
            const publicPath = imageDestination.replace(this.publicDir, "");
            cacheLink(publicPath);
            return publicPath;
          } catch (error) {
            console.log(`
              [实验功能｜experimentFeatures]下载图片时遇到错误(图片链接: ${link}): ${error}
            `);
            console.log("将使用原始链接");
          }
          // 如果发生错误，返回原始链接
          return link;
        });
      }
    }

    // 如果本地存在该图片, 路径为相对路径，复制
    // 反之，如果本地存在该图片, 路径为绝对绝对，不做任何操作
    const linkPath = path.resolve(filePath, "..", link);
    if (!path.isAbsolute(link) && fs.existsSync(linkPath)) {
      const imageName = path.basename(linkPath);
      const imageDestinationPath = path.resolve(this.imageStaticDir, imageName);
      await fs.promises.copyFile(linkPath, imageDestinationPath);
      const publicPath = imageDestinationPath.replace(this.publicDir, "");
      cacheLink(publicPath);
      return publicPath;
    }

    // 在不满足以上条件的情况下返回原链接
    // 此处为绝对路径或网络连接
    cacheLink();
    return link;
  }

  /**
   * 规范化链接
   * @param link 原链接
   * @param filePath 原文件的绝对路径
   */
  private static async normalizeLink(
    link: string,
    filePath: string
  ): Promise<string> {
    // 如果是 web url 不做修改
    if (Utils.isUrl(link)) {
      return link;
    }

    // 如果是本地文件之间的引用
    const linkPath = path.resolve(filePath, "..", link);
    if (fs.existsSync(linkPath)) {
      const content = (await fs.promises.readFile(linkPath)).toString();
      const identifierMatch = /identifier:\s(.*)/.exec(content);
      const titleMatch = /title:\S(.*)/.exec(content);
      const identifier = Processor.normalizeIdentifier(
        filePath,
        !!identifierMatch ? identifierMatch[1] : undefined,
        !!titleMatch ? titleMatch[1] : undefined
      );
      return "/passage/" + identifier;
    }

    // 如果不满足以上条件, 直接返回
    return link;
  }

  /**
   * 规范化 markdown 字符串
   * @param markdown markdown 内容
   * @param filePath markdown 文件的绝对路径
   * @returns 规范化的 markdown 字符串
   */
  private async normalizeMarkdown(
    markdown: string,
    filePath: string
  ): Promise<string> {
    let resultString = markdown;

    // 处理图片链接
    // [0]: markdown image name
    // [1]: markdown image link
    resultString = await Utils.replaceAsync(
      resultString,
      this.markdownImageRegx,
      async (
        _matchString: string,
        imageName: string,
        imageLink: string,
        _index: number,
        _input: string
      ): Promise<string> => {
        const normalizedImageLink = await this.normalizeImageLink(
          imageLink,
          filePath
        );
        return `![${imageName}](${normalizedImageLink})`;
      }
    );

    // 处理链接
    // [0]: markdown link name
    // [1]: markdown link href
    resultString = await Utils.replaceAsync(
      resultString,
      this.markdownLinkRegx,
      async (
        matchString: string,
        linkName: string,
        linkHref: string,
        index: number,
        input: string
      ): Promise<string> => {
        // 判断不是图片
        const previousIndex = Math.max(0, index - 1);
        if (input[previousIndex] !== "!") {
          const normalizedLinkHref = await Processor.normalizeLink(
            linkHref,
            filePath
          );
          return `[${linkName}](${normalizedLinkHref})`;
        }

        return matchString;
      }
    );

    return resultString;
  }

  // ==================== 通用处理流程 ====================

  /**
   * 处理 markdown 文件并返回处理结果
   * @param absolutePath markdown 文件的绝对路径
   */
  private async processMarkdown(
    absolutePath: string
  ): Promise<MarkdownProcessResult | undefined> {
    // 意外情况处理
    if (!fs.existsSync(absolutePath)) {
      return;
    }
    const extension: string | undefined = absolutePath.split(".").reverse()[0];
    const stat = await fs.promises.stat(absolutePath);
    if (!stat.isFile() || !extension || (!!extension && extension !== "md")) {
      console.log(`
        File "${absolutePath}" is not a file or has no extension or file's extension is
        not .md
      `);
      return;
    }

    // 开始正式处理
    const name = path.basename(absolutePath, extension);
    const buffer = await fs.promises.readFile(absolutePath);
    const content = await this.normalizeMarkdown(
      buffer.toString(),
      absolutePath
    );

    let markdownInformation: MarkdownInfo = {
      title: name,
    };
    let markdown = content;

    // 匹配 yaml 内容
    // [0]: yaml string
    const yamlMatchResult = content.match(this.markdownYamlRegx);
    if (!!yamlMatchResult) {
      markdownInformation = YAML.parse(yamlMatchResult[1]);
      markdown = content.slice(
        (yamlMatchResult?.index ?? 0) + yamlMatchResult[0].length
      );
    }

    // 处理并产生结结果
    const identifier = Processor.normalizeIdentifier(
      absolutePath,
      markdownInformation.identifier,
      markdownInformation.title
    );

    const abbr: BaseContentAbbr = {
      identifier: identifier,
      title: markdownInformation.title,
      abbr: markdownInformation.abbr ?? "",
      about: {
        updateTimes: (markdownInformation.updateDates ?? []).map(
          (d) => new Date(d)
        ),
        tags: (markdownInformation.tags ?? []).map((t) => ({
          id: Utils.toMD5(t),
          title: t,
        })),
        category: markdownInformation.category ?? "",
        readTime: Utils.calculateReadingTimeFromMarkdown(markdown),
      },
    };
    const detail: BaseContentDetail = {
      item: abbr,
      content: marked(markdown),
      topImage: !!markdownInformation.topImage
        ? await this.normalizeImageLink(
            markdownInformation.topImage,
            absolutePath
          )
        : "",
      topImageAlt: markdownInformation.topImageAlt,
      circleImage: !!markdownInformation.circleImage
        ? await this.normalizeImageLink(
            markdownInformation.circleImage,
            absolutePath
          )
        : "",
    };

    return {
      information: markdownInformation,
      markdown,
      abbr,
      detail,
    };
  }
}
